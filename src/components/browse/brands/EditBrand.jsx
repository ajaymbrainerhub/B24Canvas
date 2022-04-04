import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import DesignIndexItem from '../DesignIndexItem'
import styles from '../AllDesigns.module.css'
import { FolderIcon } from '../../../assets/svg'
import CreateCustomTemplate from '../../modal/CreateCustomTemplate'
import { Typography, Button, Grid } from '@material-ui/core'
import SVG from 'react-inlinesvg'

import { DirAddIcon, Folder2Icon } from '../../../assets/svg'
import TopBar from './TopBar'

const FolderPath = ({ folder }) => (
  <span className={styles.folder_path}>
    <SVG src={Folder2Icon} />
    <span>&gt;</span>
    {folder.name}
  </span>
)

function EditBrand(props) {
  const { designs, folder, currentUser } = props

  useEffect(() => {
    const { requestDesigns, currentUser } = props
    requestDesigns(currentUser?.email)
  })

  return (
    <>
      <div className={styles.indexArea}>
        <TopBar title={'Edit brand'}></TopBar>

        <FolderPath folder={folder} />
      </div>
    </>
  )
}

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

export default connect(mapStateToProps, mapDispatchToProps)(EditBrand)
