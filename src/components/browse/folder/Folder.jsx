import { Menu, MenuItem, ListItemText } from '@material-ui/core'
import { MoreHoriz } from '@material-ui/icons'
import React, { useState } from 'react'
import styles from '../folder/AllFolders.module.css'
import { withRouter } from 'react-router'
import SVG from 'react-inlinesvg'
import { Dir2Icon, DeleteIcon, RenameIcon } from '../../../assets/svg'

import { connect } from 'react-redux'
import { deleteFolder } from '../../../actions/folder_actions'
import RenameFolder from './RenameFolder'
import { Link } from 'react-router-dom'

function Folder(props) {
  const { location, history, key } = props
  const { name, id } = props.folder
  const [anchorEl, setAnchorEl] = useState(null)
  const [toggleModal, setToggleModal] = useState(false)
  const open = Boolean(anchorEl)

  const handleClick = event => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleDelete = () => {
    props.deleteFolder(id)
    setAnchorEl(null)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleRename = () => {
    setAnchorEl(null)
    setToggleModal(true)
  }

  return (
    <button className={styles.bar_btn_folder} key={key}>
      <Link to={`folder/${id}`}>
        <div className={styles.bar_btn_folder_inner}>
          <SVG src={Dir2Icon} />
          <span>{name}</span>
        </div>
      </Link>
      <button
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreHoriz />
      </button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <MenuItem onClick={handleRename}>
          <SVG src={RenameIcon} style={{ width: '18px', height: '18px' }} />

          <ListItemText style={{ marginLeft: '1em' }}>Rename</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <SVG src={DeleteIcon} style={{ width: '18px', height: '18px' }} />

          <ListItemText style={{ marginLeft: '1em' }}>Delete</ListItemText>
        </MenuItem>
      </Menu>
      {toggleModal && <RenameFolder toggleModal={setToggleModal} folder={props.folder} />}
    </button>
  )
}

const mapDispatchToProps = dispatch => ({
  deleteFolder: (folderId, success) => dispatch(deleteFolder(folderId, success))
})

export default connect(null, mapDispatchToProps)(Folder)
