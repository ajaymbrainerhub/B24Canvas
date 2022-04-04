import { RECEIVE_USER_UPLOADS, RECEIVE_UPLOAD, REMOVE_UPLOAD } from '../actions/uploaded_image_actions'

const uploadedImagesReducer = (state = [], action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_USER_UPLOADS:
      return action.payload
    case REMOVE_UPLOAD:
      // TODO: delete nextState[action.payload.uploadedImage.id]
      return state
    case RECEIVE_UPLOAD:
      return [...state, action.payload]
    default:
      return state
  }
}

export default uploadedImagesReducer
