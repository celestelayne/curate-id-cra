
import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@knotel/cinderblock'
import Json2Csv from 'json2csv'

class CreateCSVButton extends React.Component {
  objectToCSVRow = (dataObject) => {
    const dataArray = []
    for (const o in dataObject) {
      const innerValue = dataObject[o] === null ? '' : dataObject[o].toString()
      const result = innerValue.replace(/"/g, '')
      dataArray.push(result)
    }
    return dataArray
  }

  _createPurchaseOrderCSV = (items) => {
    const csvContentType = 'data:text/csv;charset=utf-8,'
    const fields = this.objectToCSVRow(Object.keys(items[0]))
    const content = csvContentType + Json2Csv.parse(items, { fields: fields })

    const encodedUri = encodeURI(content)
    const link = document.createElement('a')
    const d = new Date()
    const dateStr = `${d.getDate()}-${(d.getMonth() + 1)}-${d.getFullYear()}-${d.getHours()}-${d.getMinutes()}`
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `po-[clientname]-${dateStr}.csv`)
    document.body.appendChild(link) // Required for FF
    link.click()
    document.body.removeChild(link)
  }

  render () {
    return (
      <Button {...this.props} size="medium" onClick={() => { this._createPurchaseOrderCSV(this.props.items) }}>
        CSV
      </Button>
    )
  }
}

CreateCSVButton.propTypes = {
  items: PropTypes.any
}

export default CreateCSVButton
