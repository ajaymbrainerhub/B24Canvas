import { RECEIVE_FOLDER, RECEIVE_FOLDERS, REMOVE_FOLDER } from '../actions/folder_actions'

const foldersReducer = (state = {}, action) => {
  Object.freeze(state)
  const nextState = { ...state }
  const emptyState = {}

  switch (action.type) {
    case RECEIVE_FOLDERS:
      action.payload.forEach(element => {
        emptyState[element.id] = element
      });
     
      return emptyState

    case RECEIVE_FOLDER:
     
      return { ...state, [action.payload.id]: action.payload  }
    case REMOVE_FOLDER:
      const foundFolderKey = Object.keys(nextState).find(key => nextState[key].id === action.payload)

      if (foundFolderKey > -1) {
        delete nextState[foundFolderKey]
      }

      return nextState
    default:
      return state
  }
}

export default foldersReducer
