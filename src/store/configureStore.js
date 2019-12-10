import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import throttle from 'lodash.throttle'

import { loadState, saveState } from './localStorage'
import rootReducer from '../reducers/rootReducer'
import { version } from '../../package.json'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const persistedState = loadState()
const store = createStore(
  rootReducer,
  persistedState,
  composeEnhancer(applyMiddleware(thunk))
)

store.subscribe(throttle(() => {
  saveState({
    cart: store.getState().cart,
    projects: store.getState().projects,
    filters: store.getState().filters,
    version: version,
  })
}, 1000))

export default store
