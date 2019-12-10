import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Button } from '@knotel/cinderblock'
import styled from 'styled-components'

import { getStateByValue, getTierByFoundationValue, getTypeByFoundationValue } from '../dataMappers'
import { calculateBaselineBudget, calculateBudgetUpgrades } from '../../util'
import config, { teamDriveFolderId } from './config'
import {
  generateMemberInfo,
  generateFurnitureHeaders,
  generateCostComparsion,
  fillFurniture,
  generateRcpSchedule,
  generateFinishSchedule
} from './sheetTemplates'

import { trackExportToGoogleSheets } from '../../tracking'

const ExportButton = styled(Button)`
  width: 100%;
`

const MEMBER_INFO_SHEET_ID = 0
export const EXPORT_MASTER_SHEET_ID = 1
class ExportToSheetsButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isBlocked: true,
      pickerApiLoaded: false
    }
  }

  componentDidMount () {
    const gapiSource = document.createElement('script')
    gapiSource.setAttribute('src', `https://apis.google.com/js/platform.js?key=${config.apiKey}`) // gapi changes itself, so we can't use
    document.head.appendChild(gapiSource) // helmet which is trying to supervise tags
    this.loadClientModule()
  }

  loadClientModule = () => {
    if (!window.gapi) {
      setTimeout(this.loadClientModule, 500)
    } else {
      window.gapi.load('client', this.loadSpreadsheetModule) // initializing browser client
      window.gapi.load('picker', this.handlePickerLoad) // loading file picker for gdrive
    }
  }

  loadSpreadsheetModule = async () => {
    try {
      await window.gapi.client.init({
        clientId: config.clientId,
        scope: config.scope,
        discoveryDocs: config.discoveryDocs
      }) // login our app in
      await window.gapi.load('sheets') // loading sheets module
      this.setState({ isBlocked: false })
    } catch (err) {
      console.warn(err.details)
    }
  }

  handlePickerLoad = () => {
    this.setState({ pickerApiLoaded: true })
  }

  buildPicker = oauthToken => {
    const foldersView = new window.google.picker.DocsView()
      .setParent(teamDriveFolderId)
      .setIncludeFolders(true)
      .setEnableTeamDrives(true)
      .setLabel('Please select the folder where Purchase Order should be saved')
      .setMimeTypes('application/vnd.google-apps.folder')
      .setSelectFolderEnabled(true)

    const uploadView = new window.google.picker.DocsUploadView()
      .setParent(teamDriveFolderId)
      .setLabel('Upload to Team Drive')

    return new window.google.picker.PickerBuilder()
      .enableFeature(window.google.picker.Feature.MULTISELECT_ENABLED)
      .enableFeature(window.google.picker.Feature.SUPPORT_TEAM_DRIVES)
      .enableFeature(window.google.picker.Feature.SUPPORTS_ALL_DRIVES)
      .addView(foldersView)
      .addView(uploadView)
      .setOAuthToken(oauthToken)
      .setDeveloperKey(config.apiKey)
      .build()
  }

  handleDebug = async () => {
    console.log(this.props.items)
  }

  handleSheetCreate = async folderId => {
    this.setState({ isBlocked: true })
    const { project } = this.props

    try {
      const mergedItems = [...this.props.items, ...this.props.offPlatformItems]
      const projectSheet = {
        // creating the first sheet
        properties: { title: 'Member Info + Budget', sheetId: MEMBER_INFO_SHEET_ID },
        merges: [
          { sheetId: MEMBER_INFO_SHEET_ID, startRowIndex: 1, endRowIndex: 2, startColumnIndex: 1, endColumnIndex: 3 },
          { sheetId: MEMBER_INFO_SHEET_ID, startRowIndex: 7, endRowIndex: 8, startColumnIndex: 1, endColumnIndex: 3 },
          { sheetId: MEMBER_INFO_SHEET_ID, startRowIndex: 14, endRowIndex: 15, startColumnIndex: 1, endColumnIndex: 3 }
        ],
        data: [
          generateMemberInfo({
            totalCost: this.props.totalCost,
            companyName: project.name,
            moveInDate: project.moveInDate,
            tier: getTierByFoundationValue(project.tier).label,
            type: getTypeByFoundationValue(project.type).value,
            street: project.address,
            unitNumber: String(project.floorNumber + (project.suiteNumber ? ':' + project.suiteNumber : '')),
            city: project.city,
            state: getStateByValue(project.state).label,
            rentable: String(project.size),
            baselineBudget:
              calculateBaselineBudget(project.type, project.size, getTierByFoundationValue(project.tier).value) / 100,
            upgradeValue:
              calculateBudgetUpgrades(
                mergedItems.reduce((acc, value) => (value.isUpgrade ? [...acc, value] : acc), [])
              ) / 100 // deviding value by 100 to make sheets count it as doubles
          })
        ]
      }
      console.log('oPI>', ...this.props.offPlatformItems)

      const exportFromCatalogSheet = {
        // creating the second sheet
        properties: { title: 'Export Master', sheetId: EXPORT_MASTER_SHEET_ID },
        data: [generateFurnitureHeaders(), fillFurniture(mergedItems)]
      }

      const numberOfUniqueVendors = new Set(mergedItems.map(value => value.vendor)).size + 1
      // plus 1 to fill last line

      const costComparsionSheet = {
        // creating the third sheet
        properties: { title: 'Cost Comparison by Vendors' },
        data: [generateCostComparsion(numberOfUniqueVendors)]
      }

      const rcpSchedule = {
        properties: { title: 'RCP Schedule' },
        data: [generateRcpSchedule({ designer: '' })]
      }

      const finishSchedule = {
        properties: { title: 'Finish Schedule' },
        data: [
          generateFinishSchedule({
            designer: '',
            isLaborUnion: false,
            deliveryType: 'STANDARD TIME'
          })
        ]
      }

      const date = moment().format()
      const spreadsheet = await window.gapi.client.sheets.spreadsheets.create({
        // creating the spreadsheet
        properties: {
          title: `${project.name}_${project.address}${project.floorNumber ? '-' + project.suiteNumber : ''}_${
            project.city
          }_${date}`
        },
        sheets: [projectSheet, exportFromCatalogSheet, costComparsionSheet, rcpSchedule, finishSchedule]
      })
      // trying to move spreadsheet from root of drive to the custom folder
      const fileId = spreadsheet.result.spreadsheetId
      const spreadsheetAsFile = await window.gapi.client.drive.files.get({ fileId, fields: 'id, parents' })
      const previousParents = spreadsheetAsFile.result.parents.join(',')

      try {
        await window.gapi.client.drive.files.get({ fileId })
        await window.gapi.client.drive.files.update({
          fileId,
          supportsAllDrives: true,
          supportsTeamDrives: true,
          addParents: folderId,
          removeParents: previousParents,
          fields: 'id, parents'
        })
        window.open(spreadsheet.result.spreadsheetUrl, '_blank')
        return
      } catch (e) {
        window.open(spreadsheet.result.spreadsheetUrl, '_blank')
      }

      // moving file into folder
      await window.gapi.client.drive.files.update({
        fileId,
        supportsAllDrives: true,
        supportsTeamDrives: true,
        addParents: folderId,
        removeParents: previousParents,
        fields: 'id, parents'
      })
      window.open(spreadsheet.result.spreadsheetUrl, '_blank')
      return
    } catch (e) {
      console.error(e)
    } finally {
      this.setState({ isBlocked: false })
    }
  }

  handleButtonExportClick = async () => {
    trackExportToGoogleSheets()
    try {
      this.setState({ isBlocked: true })
      const authInstance = window.gapi.auth2.getAuthInstance()
      if (!authInstance.isSignedIn.get()) {
        // checking if user logged in
        await authInstance.signIn()
      }
      const userInstance = await authInstance.currentUser.get()
      const isUserAllowedAccess = await userInstance.hasGrantedScopes(config.scope)
      if (!isUserAllowedAccess) {
        // checking if user allowed access to spreadsheets
        await userInstance.grant({ scope: config.scope })
      }

      const picker = this.buildPicker(authInstance.currentUser.get().getAuthResponse().access_token)
      picker.setVisible(true)
      picker.setCallback(item => {
        if (item.action === window.google.picker.Action.PICKED) {
          this.handleSheetCreate(item.docs[0].id)
        } else if (item.action === 'loaded') {
          // for some reason there is event for loading but no constant for it
        } else {
          picker.dispose()
          this.setState({ isBlocked: false })
        }
      })
    } catch (e) {
      console.error(e)
    }
  }

  render () {
    console.log(this.props.project)
    return (
      <ExportButton
        {...this.props}
        size="medium"
        disabled={this.state.isBlocked || !this.state.pickerApiLoaded}
        onClick={this.handleButtonExportClick}
      >
        Export To Google Sheets
      </ExportButton>
    )
  }
}

ExportToSheetsButton.propTypes = {
  items: PropTypes.any,
  offPlatformItems: PropTypes.any,
  project: PropTypes.object,
  totalCost: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

export default ExportToSheetsButton
