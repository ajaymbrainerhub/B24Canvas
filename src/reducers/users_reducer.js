import {
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_AVATAR,
  RECEIVE_USER_BACKGROUND,
  RECEIVE_USER
} from '../actions/session_actions'
import { RECEIVE_USER_UPLOADS, REMOVE_UPLOAD, RECEIVE_UPLOAD } from '../actions/uploaded_image_actions'

const usersReducer = (state = {}, action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_USER_UPLOADS:
      return { ...state, [action.payload]: action.payload }
    case RECEIVE_USER_AVATAR:
      return { ...state, ...{ [action.userId]: { ...state[action.userId], avatar: action.avatar } } }
    case RECEIVE_USER_BACKGROUND:
      return { ...state, ...{ [action.userId]: { ...state[action.userId], background: action.background } } }
    case REMOVE_UPLOAD:
      return { ...state, [action.payload]: action.payload }
    case RECEIVE_UPLOAD:
      return { ...state, [action.payload]: action.payload }
    case RECEIVE_CURRENT_USER:
      return { ...state, ...{ [action.user.id]: action.user } }
    case RECEIVE_USER: {
      console.log(`USER_ADDED_TOSTORE: ${action.user.id}`)
      return { ...state, ...{ [action.user.id]: action.user } }
    }
    default:
      return state
  }
}

export default usersReducer
