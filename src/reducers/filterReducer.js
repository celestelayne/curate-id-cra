import set from 'lodash.set'

import initialState from './initialState'
import {
  ADD_FILTER,
  REMOVE_FILTER,
  EMPTY_FILTERS
} from '../actions/actionTypes'

export default function filters (state = initialState.filters, action) {
  switch (action.type) {
    case ADD_FILTER:
      return {
        ...state,
        ...action.payload,
      }
    case REMOVE_FILTER:
      return {
        ...(set(state, action.payload, false)),
      }
    case EMPTY_FILTERS:
      return {
        catalog: {
          venture: false,
          growth: false,
          enterprise: false,
        },
        category: {
          workstations: false,
          seating: false,
          tables: false,
          mobile: false,
          storage: false
        },
      }
    default:
      return state
  }
}
