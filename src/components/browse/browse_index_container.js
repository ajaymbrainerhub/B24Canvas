import { connect } from 'react-redux'

import BrowseIndex from './BrowseIndex'
import { requestFolders } from '../../actions/folder_actions'

const mapStateToProps = state => {
  const folders = Object.values(state.entities.folders)
  return {
    folders,
    currentUser: state.entities.users[state.session.id]
  }
}

const mapDispatchToProps = dispatch => ({
  requestFolders: email => dispatch(requestFolders(email))
})

export default connect(mapStateToProps, mapDispatchToProps)(BrowseIndex)
