import { connect } from 'react-redux'

import { fetchUserUploads, receiveUpload, updateUpload } from '../../../actions/uploaded_image_actions'
import { toggleModal } from '../../../actions/modal_actions'
import Uploads from './Uploads'

const mapStateToProps = state => {
  const currentUser = state.entities.users[state.session.id]
  return {
    currentUser,
    folder: { name: 'Uploads' },
    uploadedImages: state?.entities?.uploadedImages || []
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUserUploads: email => dispatch(fetchUserUploads(email)),
  receiveUpload: payload => dispatch(receiveUpload(payload)),
  toggleModal: id => dispatch(toggleModal('uploadedModal', id)),
  updateUpload: (image, user) => dispatch(updateUpload(image, user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Uploads)
