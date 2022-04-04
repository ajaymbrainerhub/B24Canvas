import { RECEIVE_TEMPLATES, RECEIVE_UPDATED_DESIGN } from '../../actions/design_actions'

const templates = (state = {}, action) => {
  const emptyState = {}
  switch (action.type) {
    case RECEIVE_TEMPLATES:
      action.payload.forEach(element => {
        emptyState[element.id] = element
      })
      console.log(`RECEIVE_TEMPLATES: ${JSON.stringify(emptyState)}`)
      return emptyState

    case RECEIVE_UPDATED_DESIGN:
      console.log(`RECEIVE_TEMPLATE: ${JSON.stringify(action.payload)}`)
      return { ...state, [action.payload.id]: { ...state[action.payload.id], ...action.payload } }
    default:
      return state
  }
}

export default templates
