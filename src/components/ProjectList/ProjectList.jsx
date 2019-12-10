import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Box, Text } from '@knotel/cinderblock'
import uuid from 'uuid/v4'

import { Query, Mutation } from 'react-apollo'

import { ALL_PROJECTS_QUERY } from '../../queries'
import { DELETE_PROJECT_MUTATION, UPDATE_PROJECT_MUTATION, CREATE_ASSIGNMENT_MUTATION } from '../../mutations'

import * as projectActions from '../../actions/projectActions'
import theme from '../../theme'
import ToastService from '../../services/toast'
import { currentUser } from '../../services/auth'

import ConfirmationModal from '../ConfirmationModal'
import { ProjectModal } from '../NewProjectModal'

import ProjectListItem from './ProjectListItem'
import ListHeader from './ProjectListHeader'
import LIST_CONFIG from './config'
import { SORTING_CRITERIA_LIST } from './ListSorter'

const Container = styled(Box)`
  border: 1px solid ${theme.colors.borderGray};
`

const searchFilter = (list, searchQuery) => {
  return list.filter(item => (item['name'] ? item['name'].toLowerCase().includes(searchQuery) : false))
}

const structureProjects = projects =>
  projects.reduce(
    (acc, value) => {
      acc.all.push(value)
      if (value.status === 'ARCHIVED') {
        acc.archived.push(value)
      } else if (value) {
        // here should be the check for designer id equality
        acc.personal.push(value)
      }
      return acc
    },
    { all: [], archived: [], personal: [] }
  )

class ProjectList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      searchQuery: '',
      deleteModalVisible: false,
      archiveModalVisible: false,
      editModalVisible: false,
      selectedId: null,
      currentComparator: { name: '', func: void 0, order: 'ASC' }
    }
  }

  handleSearch = event => {
    const searchQuery = event.target.value && event.target.value.toLowerCase()
    this.setState({ searchQuery })
  }

  handleAddProject = data => {
    this.props.projectActions.addProject({
      id: uuid(),
      creationDate: new Date(),
      designer: currentUser().displayName,
      ...data
    })
    ToastService.showMessage('Project added', `You have successfully added ${data['name']}.`)
  }

  handleOpenArchiveModal = selectedId => {
    this.setState({ selectedId, archiveModalVisible: true })
  }

  handleOpenDeleteModal = selectedId => {
    this.setState({ selectedId, deleteModalVisible: true })
  }

  handleOpenEditModal = selectedId => {
    this.setState({ selectedId, editModalVisible: true })
  }

  handleCloseEditModal = success => values => {
    if (success && values) {
      const { selectedId } = this.state
      this.props.projectActions.editProject({
        ...values,
        designer: currentUser().displayName,
        id: selectedId
      })

      ToastService.showMessage('Project edited', `You have successfully edited ${values['name']}.`)
    }

    this.setState({ selectedId: null, editModalVisible: false })
  }

  handleCloseArchiveModal = (success, editProject) => () => {
    if (success) {
      const { selectedId } = this.state
      this.props.projectActions.archiveProject(selectedId)
      const currentProject = this.selectedProject
      const transformedCurrentProject = {
        name: currentProject.name,
        status: 'ARCHIEVED',
        tier: currentProject.tier,
        moveInDate: currentProject.move_in_date,
        projectmatesId: 'N/A',
        sfdcOpportunityId: currentProject.oppId,
        availabilityId: currentProject.availId,
        region: currentProject.region.label,
        address: currentProject.street,
        city: currentProject.city,
        state: currentProject.state.value,
        floorNumber: currentProject.floor_number,
        suiteNumber: currentProject.suite_number,
        size: currentProject.rent_sqft,
        sizeUnit: 'SQFT'
      }
      editProject({ variables: { id: selectedId, params: transformedCurrentProject } })
      ToastService.showMessage('Project archived', `You have successfully archived ${this.selectedProject['name']}.`)
    }

    this.setState({ selectedId: null, archiveModalVisible: false })
  }

  handleCloseDeleteModal = (success, deleteProject) => () => {
    if (success) {
      const { selectedId } = this.state
      deleteProject({ variables: { id: selectedId } })
      ToastService.showMessage('Project deleted', `You have successfully deleted ${this.selectedProject['name']}.`)
    }
    this.setState({ selectedId: null, deleteModalVisible: false })
  }

  handleSort = criterion => {
    if (this.state.currentComparator.name === criterion) {
      this.setState(state => ({
        currentComparator: {
          name: state.currentComparator.name,
          func: state.currentComparator.func,
          order: state.currentComparator.order === 'ASC' ? 'DESC' : 'ASC'
        }
      }))
    } else {
      switch (criterion) {
        case SORTING_CRITERIA_LIST.MOVE_IN_DATE:
          this.setState({
            currentComparator: {
              name: SORTING_CRITERIA_LIST.MOVE_IN_DATE,
              func: (a, b) => {
                const ascComparsion = Math.sign(new Date(a.move_in_date) - new Date(b.move_in_date))
                return this.state.currentComparator.order === 'ASC' ? ascComparsion : -ascComparsion
              },
              order: 'ASC'
            }
          })
          break
        case SORTING_CRITERIA_LIST.DESIGNER:
          this.setState({
            currentComparator: {
              name: SORTING_CRITERIA_LIST.MOVE_IN_DATE,
              func: (a, b) => {
                const ascComparsion = Math.sign(a.designer.toLowerCase() - b.designer.toLowerCase())
                return this.state.currentComparator.order === 'ASC' ? ascComparsion : -ascComparsion
              },
              order: 'ASC'
            }
          })
          break
        case SORTING_CRITERIA_LIST.NEWEST_FIRST:
          this.setState({
            currentComparator: {
              name: SORTING_CRITERIA_LIST.NEWEST_FIRST,
              func: (a, b) => {
                const ascComparsion = Math.sign(new Date(a.creationDate) - new Date(b.creationDate))
                return this.state.currentComparator.order === 'ASC' ? ascComparsion : -ascComparsion
              },
              order: 'ASC'
            }
          })
          break
        default:
          break
      }
    }
  }

  render () {
    const { title, selectedProjectType, projectActions } = this.props
    const { searchQuery, deleteModalVisible, archiveModalVisible, editModalVisible, selectedId } = this.state
    return (
      <Query query={ALL_PROJECTS_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <Text>Loading...</Text>
          if (error) return <Text>Error :(</Text>
          if (data) {
            const filteredList = searchFilter(structureProjects(data.allProjects)[selectedProjectType], searchQuery)
            filteredList.sort(this.state.currentComparator.func)
            this.selectedProject = selectedId ? filteredList.find(item => item.id === selectedId) : {}
            console.log('project data:', filteredList)
            return (
              <Container width={[1]} my={4}>
                <ListHeader
                  setSortingCriterion={this.handleSort}
                  onSearch={this.handleSearch}
                  title={title}
                  headers={LIST_CONFIG}
                  onAdd={this.handleAddProject}
                />
                <Mutation mutation={CREATE_ASSIGNMENT_MUTATION}>
                  {createAssignment => {
                    return filteredList.map(project => (
                      <ProjectListItem
                        selectedProjectType={selectedProjectType}
                        config={LIST_CONFIG}
                        key={project.id}
                        profileId={currentUser().id}
                        item={project}
                        onDelete={this.handleOpenDeleteModal}
                        onArchive={this.handleOpenArchiveModal}
                        onEdit={this.handleOpenEditModal}
                        setProject={project => {
                          createAssignment({
                            variables: { params: { projectId: project.id, profileId: currentUser().id } }
                          })
                          projectActions.setProject(project)
                        }}
                      />
                    ))
                  }}
                </Mutation>
                <Mutation mutation={UPDATE_PROJECT_MUTATION} refetchQueries={[{ query: ALL_PROJECTS_QUERY }]}>
                  {editProject => (
                    <ConfirmationModal
                      open={archiveModalVisible}
                      onClose={this.handleCloseArchiveModal(false)}
                      onConfirm={this.handleCloseArchiveModal(true, editProject)}
                    />
                  )}
                </Mutation>
                <Mutation refetchQueries={[{ query: ALL_PROJECTS_QUERY }]} mutation={DELETE_PROJECT_MUTATION}>
                  {deleteProject => (
                    <ConfirmationModal
                      secondary
                      open={deleteModalVisible}
                      onClose={this.handleCloseDeleteModal(false)}
                      onConfirm={this.handleCloseDeleteModal(true, deleteProject)}
                      actionLabel="Delete project"
                      title="Delete project"
                      subTitle="Are you sure you want to delete this project?"
                    />
                  )}
                </Mutation>
                <ProjectModal
                  visible={editModalVisible}
                  onClose={this.handleCloseEditModal(false)}
                  values={this.selectedProject}
                  onSubmit={this.handleCloseEditModal(true)}
                />
              </Container>
            )
          }
        }}
      </Query>
    )
  }
}

ProjectList.propTypes = {
  selectedProjectType: PropTypes.string,
  title: PropTypes.string,
  projectActions: PropTypes.shape({
    addProject: PropTypes.func,
    removeProject: PropTypes.func,
    archiveProject: PropTypes.func,
    editProject: PropTypes.func,
    setProject: PropTypes.func
  })
}

function mapDispatchToProps (dispatch) {
  return {
    projectActions: bindActionCreators(projectActions, dispatch),
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ProjectList)
