import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { requestDesigns } from '../../../actions/design_actions'
import DesignIndexItem from '../DesignIndexItem'
import styles from '../AllDesigns.module.css'
import { FolderIcon } from '../../../assets/svg'
import CreateCustomTemplate from '../../modal/CreateCustomTemplate'
import { Typography, Button, Grid } from '@material-ui/core'
import SVG from 'react-inlinesvg'
import { requestFolder } from '../../../actions/folder_actions'
import { DirAddIcon, Folder2Icon } from '../../../assets/svg'

const TopBar = () => (
  <Grid container justifyContent="space-between">
    <Grid item>
      <Typography className={styles.pageName}>Folders</Typography>
    </Grid>
    <Grid item>
      <Button className={styles.pageBtn}>
        Add Folder
        <SVG src={DirAddIcon} />
      </Button>
    </Grid>
  </Grid>
)
const FolderPath = ({ folder }) => (
  <span className={styles.folder_path}>
    <SVG src={Folder2Icon} />
    <span>&gt;</span>
    {folder?.name}
  </span>
)
function CustomFolderBrowser(props) {
  const [toggleShowModal, setToggleShowModal] = useState({ showModal: false })

  useEffect(() => {
    const { getDesigns, currentUser, RequestFolder, ownProps } = props
    //RequestFolder(ownProps.match.params.folderId)
    getDesigns(currentUser?.email)
  }, [])

  const { designs, folder, currentUser } = props

  return (
    <>
      <div className={styles.indexArea}>
        {toggleShowModal.showModal && (
          <CreateCustomTemplate closeModal={() => setToggleShowModal({ showModal: false })} folder={folder} />
        )}
        <TopBar />

        <FolderPath folder={folder} />

        {designs.length === 0 ? (
          <EmptyFolder setToggleShowModal={setToggleShowModal} />
        ) : (
          <div className={styles.masonry}>
            {designs.map(design => (
              <DesignIndexItem design={design} currentUser={currentUser} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

function EmptyFolder(props) {
  return (
    <div className={styles.emptyWrapper}>
      <div className={styles.empty}>
        <SVG src={FolderIcon} />
        <h2>This folder is empty.</h2>
        <span>Fill your folder with projects</span>
        <button role="button" onClick={() => props.setToggleShowModal({ showModal: true })}>
          Create project
        </button>
      </div>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const designs = Object.values(state.entities.designs)
  const { folderId } = ownProps.match.params
  return {
    currentUser: state.entities.users[state.session.id],
    folder: state.entities.folders[folderId],
    designs: designs.filter(design => design.folderId === folderId && !design.trash),
    ownProps
  }
}

const mapDispatchToProps = dispatch => ({
  RequestFolder: id => dispatch(requestFolder(id)),
  getDesigns: () => {
    dispatch(requestDesigns())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomFolderBrowser)
