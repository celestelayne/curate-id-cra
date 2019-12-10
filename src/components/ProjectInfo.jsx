import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Flex, Text } from '@knotel/cinderblock'
import { Query } from 'react-apollo'
import { CART_ITEMS_QUERY } from '../queries'
import styled from 'styled-components'
import uuid from 'uuid/v4'
import { getTierByFoundationValue } from './dataMappers'
import { currentUser } from '../services/auth'
import ToastService from '../services/toast'
import * as projectActions from '../actions/projectActions'

import { calcRentByFoundationData, formatCurrency, calculateBudgetUpgrades } from '../util'
import theme from '../theme'

import { ProjectModal } from './NewProjectModal'
import { InfoLabel } from './Txt'

const DISABLED_ROUTES = ['/projects']

const Container = styled(Flex)`
  position: absolute;
  z-index: 1000;
  margin-top: 57px;
  width: 100%;
  background-color: ${theme.colors.white};
  align-items: center;
  background-color: #fafafa;
  border-bottom: 1px solid ${props => props.theme.colors.borderGray};
  flex-direction: column;
  ${props => props.theme.mediaQueries['md']} {
    height: 128px;
    justify-content: center;
  }
`

const Label = styled(InfoLabel)`
  font-size: ${props => props.theme.fontSizes[0]}px;
  color: #607d8b;
  font-weight: ${props => props.theme.fontWeights.bold};
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
  width: auto;
`

const Holder = styled(Flex)`
  max-width: 1280px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  flex-direction: column;
  ${props => props.theme.mediaQueries['md']} {
    flex-direction: row;
  }
`

const ResponsiveContainer = styled(Flex)`
  flex-direction: column;
  width: 100%;
  ${props => props.theme.mediaQueries['md']} {
    flex-direction: row;
    width: auto;
    padding: 0;
  }
`

const Value = styled(Text)`
  font-size: ${props => props.theme.fontSizes[4]}px;
  font-weight: ${props => props.theme.fontWeights.semiBold};
  line-height: ${props => props.theme.space[4]}px;
  color: ${props => (props.textColor ? props.textColor : null)};
`

const Item = styled(Flex)`
  justify-content: space-between;
  ${props => props.theme.mediaQueries['md']} {
    flex-direction: column;
    justify-content: flex-start;
  }
`
const VerticalLine = styled.div`
  height: 64px;
  background-color: #cfd8dc;
  margin: 0px 24px;
  width: 1px;
  display: none;
  ${props => props.theme.mediaQueries['md']} {
    display: block;
  }
`

const EditProjectButton = styled(Button)`
  background: transparent;
  &:hover {
    background: transparent;
  }
`

const NewProjectButton = styled(Button)`
  max-height: 47px;
`

class ProjectInfo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      editModalVisible: false
    }
  }

  handleCloseEditModal = success => values => {
    if (success && values) {
      const { project } = this.props
      if (project) {
        this.props.projectActions.editProject({
          ...values,
          id: project.id
        })
        ToastService.showMessage('Project edited', `You have successfully edited ${values['name']}.`)
      } else {
        this.props.projectActions.addProject({
          ...values,
          id: uuid(),
          creationDate: new Date(),
          designer: currentUser().displayName
        })
        ToastService.showMessage('Project added', `You have successfully added ${values['name']}.`)
      }
    }

    this.setState({ selectedId: null, editModalVisible: false })
  }

  handleOpenEditModal = () => {
    this.setState({ editModalVisible: true })
  }

  render () {
    const { project, location } = this.props
    const { editModalVisible } = this.state
    return DISABLED_ROUTES.includes(location.pathname) ? null : (
      <React.Fragment>
        <Container>
          <Holder alignItems="center" justifyContent="space-between">
            <ResponsiveContainer>
              <Item>
                <Label>Project</Label>
                <Value>{project && project['name'] ? project['name'] : '-'}</Value>
              </Item>
              <VerticalLine />
              <Item>
                <Label>Pricing Tier</Label>
                <Value>{project && project['tier'] ? getTierByFoundationValue(project['tier']).label : '-'}</Value>
              </Item>
              <VerticalLine />
              <Item>
                <Label>Move in Date</Label>
                <Value>
                  {project && project['moveInDate'] ? moment(project['moveInDate']).format('MMMM D, YYYY') : '-'}
                </Value>
              </Item>
              <VerticalLine />
              <Item>
                <Label>Budget</Label>
                <Query query={CART_ITEMS_QUERY}>
                  {({ loading, error, data }) => {
                    if (loading) return 'Loading...'
                    return (
                      <Value>
                        {project
                          ? formatCurrency(
                            calcRentByFoundationData(project, { toCurrency: false }) +
                                calculateBudgetUpgrades(
                                  data.cart
                                    .filter(product => product.projectId === project.id)
                                    .filter(product => product.isUpgrade)
                                )
                          )
                          : '-'}
                      </Value>
                    )
                  }}
                </Query>
              </Item>
            </ResponsiveContainer>
            {project ? (
              <EditProjectButton onClick={this.handleOpenEditModal}>Edit project</EditProjectButton>
            ) : (
              <NewProjectButton onClick={this.handleOpenEditModal}>Add new project</NewProjectButton>
            )}
          </Holder>
        </Container>
        <ProjectModal
          title={project ? 'Edit project' : 'Add new project'}
          submitButtonTitle={project ? 'Save changes' : 'Save project'}
          visible={editModalVisible}
          onClose={this.handleCloseEditModal(false)}
          values={project}
          onSubmit={this.handleCloseEditModal(true)}
        />
      </React.Fragment>
    )
  }
}

ProjectInfo.propTypes = {
  project: PropTypes.object,
  projectActions: PropTypes.object,
  location: PropTypes.object
}

function mapStateToProps (state) {
  return {
    project: state.projects.selectedProject
  }
}

function mapDispatchToProps (dispatch) {
  return {
    projectActions: bindActionCreators(projectActions, dispatch)
  }
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProjectInfo)
