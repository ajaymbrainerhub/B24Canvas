import { UPDATE_SEARCH } from '../actions/search_bar_actions'

const searchbarReducer = (state = '', action) => {
  switch (action.type) {
    case UPDATE_SEARCH:
      return action.payload
    default:
      return state
  }
}

export default searchbarReducer
