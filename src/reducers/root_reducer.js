import { combineReducers } from 'redux'

import entitiesReducer from './entities_reducer'
import errorsReducer from './errors_reducer'
import sessionReducer from './session_reducer'
import uiReducer from './ui_reducer'
import path_reducer from './path_reducer'

const rootReducer = combineReducers({
  entities: entitiesReducer,
  errors: errorsReducer,
  session: sessionReducer,
  ui: uiReducer,
  path: path_reducer
})

export default rootReducer
