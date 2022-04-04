import React from 'react'
import SVG from 'react-inlinesvg'

import styles from '../styles.scss'
import { FolderIcon, TrashBinIcon } from '../../../assets/svg'

export default function Empty(props) {
  const { showModal } = props
  return (
    <div className={'emptyWrapper'}>
      <div className={'empty'}>
        <SVG src={FolderIcon} />
        <h2>This folder is empty.</h2>
        <span>Fill your folder with projects</span>
        <button role="button" onClick={showModal}>
          Create project
        </button>
      </div>
    </div>
  )
}

function EmptyTrash(props) {
  return (
    <div className={'emptyWrapper'}>
      <div className={'empty'}>
        <SVG src={TrashBinIcon} />
        <h2>Trash is empty</h2>
        <span>
          Any designs you delete will appear here, you have 60 days to restore them before them deleted pemanetly
        </span>
      </div>
    </div>
  )
}

function EmptyUploads(props) {
  return (
    <div className={'emptyWrapper'}>
      <div className={'empty'}>
        <SVG src={FolderIcon} />
        <h2>You did not upload nothing</h2>
        <span>Here will appear your uploads.</span>
      </div>
    </div>
  )
}

export { EmptyTrash, EmptyUploads }
