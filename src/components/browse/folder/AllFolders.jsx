import React from 'react'
import styles from '../folder/AllFolders.module.css'
import SVG from 'react-inlinesvg'
import { DirAddIcon, FavIcon, TimeLeftIcon, ShopCart } from '../../../assets/svg'
import Folder from './Folder'
import { connect } from 'react-redux'
import { requestFolders } from '../../../actions/folder_actions'
import CreateFolder from '../folder/CreateFolder'

class AllFolders extends React.Component {
  constructor(props) {
    super(props)
    this.state = { toggleCreateModal: false }
    this.setWrapperRef = this.setWrapperRef.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle(toggle) {
    this.setState({ toggleCreateModal: toggle })
  }

  componentDidMount() {
    const { requestFolders, currentUser } = this.props
    requestFolders(currentUser?.email)
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  setWrapperRef(node) {
    this.wrapperRef = node
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ create: null })
    }
  }

  render() {
    const { create } = this.state
    const { folders, setToggleCategory } = this.props
    return (
      <>
        <div className={styles.topBar}>
          <div className={styles.topBar_inner}>
            <button className={styles.bar_btn} onClick={e => setToggleCategory('recent')}>
              <SVG src={TimeLeftIcon} />
              <span>Recent designs</span>
            </button>

            <button className={styles.bar_btn} onClick={e => setToggleCategory('saved')}>
              <SVG src={FavIcon} />
              <span>Saved designs</span>
            </button>

            <button className={styles.bar_btn} onClick={e => setToggleCategory('purchased')}>
              <SVG src={ShopCart} />
              <span>Purchased templates</span>
            </button>
            {folders && folders.map((folder, idx) => <Folder key={idx} folder={folder} />)}
          </div>
          <button className={styles.nav_btn_add} onClick={() => this.setState({ toggleCreateModal: true })}>
            <SVG src={DirAddIcon} />
            <span>Add folder</span>
          </button>
        </div>
        {this.state.toggleCreateModal && (
          <div className={styles.modalWrap}>
            <div className={styles.boxWrap} ref={this.setWrapperRef}>
              <CreateFolder toggleModal={this.handleToggle} />
            </div>
          </div>
        )}
      </>
    )
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(AllFolders)
