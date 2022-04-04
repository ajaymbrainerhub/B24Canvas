import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Design from './Design'
import { receiveElement } from '../../../actions/element_actions'

const mapDispatchToProps = dispatch => ({
  receiveElement: element => dispatch(receiveElement(element))
})

export default withRouter(connect(false, mapDispatchToProps)(Design))
