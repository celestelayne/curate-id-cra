import * as ActionTypes from './actionTypes'

export const addFilter = (filter) => (
  {
    type: ActionTypes.ADD_FILTER,
    payload: filter
  }
)

export const removeFilter = (filter) => (
  {
    type: ActionTypes.REMOVE_FILTER,
    payload: filter
  }
)

export const emptyFilters = () => (
  {
    type: ActionTypes.EMPTY_FILTERS
  }
)
