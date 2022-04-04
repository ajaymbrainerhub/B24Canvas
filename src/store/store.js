import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import rootReducer from '../reducers/root_reducer'

const configureStore = (preloadedState = {}) =>
  process.env.REACT_APP_MODE !== 'production' && process.env.REACT_APP_REDUX_LOGGER === 'true'
    ? createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger))
    : createStore(rootReducer, preloadedState, applyMiddleware(thunk))

export default configureStore
