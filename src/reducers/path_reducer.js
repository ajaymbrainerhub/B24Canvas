import { SET_CURRENT_PATH } from '../actions/folder_actions'

const setCurrentPath = (state = '', action) => {
  switch (action.type) {
    case SET_CURRENT_PATH:
      return action.payload
    default:
      return state
  }
}

export default setCurrentPath
