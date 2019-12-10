import * as ActionTypes from './actionTypes'

export const addProject = (data) => (
  {
    type: ActionTypes.GENERAL_ADD_PROJECT,
    payload: data
  }
)

export const editProject = (data) => (
  {
    type: ActionTypes.GENERAL_EDIT_PROJECT,
    payload: data
  }
)

export const removeProject = (id) => (
  {
    type: ActionTypes.GENERAL_REMOVE_PROJECT,
    payload: id
  }
)

export const archiveProject = (id) => (
  {
    type: ActionTypes.GENERAL_ARCHIVE_PROJECT,
    payload: id
  }
)

export const setProject = (project) => (
  {
    type: ActionTypes.SET_PROJECT,
    payload: project
  }
)

export const removeSelectedProject = () => (
  {
    type: ActionTypes.REMOVE_PROJECT,
  }
)
