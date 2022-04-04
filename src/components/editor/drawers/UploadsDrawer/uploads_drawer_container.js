import { connect } from 'react-redux'

import UploadsDrawer from './index'
import { fetchUserUploads, receiveUpload, updateUpload } from '../../../../actions/uploaded_image_actions'

const mapStateToProps = state => {
  const currentUser = state.entities.users[state.session.id]
  return {
    currentUser,
    images: state?.entities?.uploadedImages || []
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUserUploads: email => dispatch(fetchUserUploads(email)),
  receiveUpload: payload => dispatch(receiveUpload(payload)),
  updateUpload: (image, email) => dispatch(updateUpload(image, email))
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadsDrawer)
