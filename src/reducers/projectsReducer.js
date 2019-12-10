import {
  GENERAL_ARCHIVE_PROJECT,
  GENERAL_REMOVE_PROJECT,
  GENERAL_EDIT_PROJECT,
  GENERAL_ADD_PROJECT,
  SET_PROJECT,
  REMOVE_PROJECT,
} from '../actions/actionTypes'
import initialState from './initialState'

export default function filters (state = initialState.projects, action) {
  switch (action.type) {
    case GENERAL_ADD_PROJECT:
      return {
        ...state,
        personal: [...state.personal, action.payload],
        all: [...state.all, action.payload],
        selectedProject: state.selectedProject || action.payload,
      }
    case GENERAL_REMOVE_PROJECT:
      return {
        ...state,
        personal: state.personal.filter(project => project.id !== action.payload),
        all: state.all.filter(project => project.id !== action.payload),
        archived: state.archived.filter(project => project.id !== action.payload),
        selectedProject: state.selectedProject.id === action.payload
          ? null
          : state.selectedProject,
      }
    case GENERAL_ARCHIVE_PROJECT:
      return {
        ...state,
        archived: [ ...state.archived, state.personal.find(item => item.id === action.payload) ],
        personal: state.personal.filter(project => project.id !== action.payload),
        all: state.all.filter(project => project.id !== action.payload),
      }
    case GENERAL_EDIT_PROJECT:
      return {
        ...state,
        personal: state.personal.map(project => project.id === action.payload.id ? action.payload : project),
        all: state.all.map(project => project.id === action.payload.id ? action.payload : project),
        archived: state.archived.map(project => project.id === action.payload.id ? action.payload : project),
        selectedProject: state.selectedProject.id === action.payload.id ? action.payload : state.selectedProject,
      }
    case SET_PROJECT:
      return {
        ...state,
        selectedProject: action.payload
      }
    case REMOVE_PROJECT:
      return {
        ...state,
        selectedProject: null,
      }
    default:
      return state
  }
}
