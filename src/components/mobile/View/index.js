import { connect } from 'react-redux'

import Editor from './editor'
import { createDesign, requestDesign, updateDesign } from '../../../actions/design_actions'
import elementsOnDesign from '../../../reducers/design/elements_selector'
import { receiveElement, createElement } from '../../../actions/element_actions'

const mapStateToProps = (state, ownProps) => {
  const design = state.entities.designs[ownProps.match.params.id]
  const currentUser = state.entities.users[state.session.id]
  return {
    currentUser,
    design,
    elements: design ? elementsOnDesign(state, design.id) : []
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  requestDesign: () => dispatch(requestDesign(ownProps.match.params.id)),
  createDesign: design => dispatch(createDesign(design, false)),
  updateDesign: design => dispatch(updateDesign(design)),
  receiveElement: element => dispatch(receiveElement(element)),
  createElement: (designId, element) => dispatch(createElement(designId, element))
})

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
