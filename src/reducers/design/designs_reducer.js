import { RECEIVE_DESIGNS, RECEIVE_DESIGN, REMOVE_DESIGN, RECEIVE_UPDATED_DESIGN } from '../../actions/design_actions'
import { CREATE_ELEMENT } from '../../actions/element_actions'

const designsReducer = (state = {}, action) => {
  const nextState = { ...state }
  const emptyState = {}
  switch (action.type) {
    case RECEIVE_DESIGNS:
      action.payload.forEach(element => {
        emptyState[element.id] = element
      })
      console.log(`RECEIVE_DESIGNS: ${JSON.stringify(emptyState)}`)
      return emptyState

    case RECEIVE_UPDATED_DESIGN:
      console.log(`PREVIOUS_STATE: ${JSON.stringify({ ...state })}`)
      console.log(`PAYLOAD+: ${JSON.stringify(action.payload)}`)
      console.log(`MODIFIED_STATE: ${JSON.stringify({ ...state, [action.payload.id]: action.payload })}`)
      return { ...state, [action.payload.id]: action.payload }

    case RECEIVE_DESIGN:
      console.log(
        `NEW DESIGN: ${JSON.stringify({
          ...state,
          [action.payload.data.result.designs.id]: action.payload.data.result.designs
        })}`
      )
      //return { ...state, ...{ [designId]: design } }
      return { ...state, [action.payload.data.result.designs.id]: action.payload.data.result.designs }
    case REMOVE_DESIGN:
      delete nextState[action.payload.design.id]
      console.log(`Remove : ${action.payload.design.id} nextstate=${nextState}`)
      return nextState
    case CREATE_ELEMENT:
      const newDesign = { ...nextState[action.designId] }
      newDesign.elements = [...nextState[action.designId].elements, action.element.id]
      return { ...state, [newDesign.id]: newDesign }
    default:
      return state
  }
}

export default designsReducer
