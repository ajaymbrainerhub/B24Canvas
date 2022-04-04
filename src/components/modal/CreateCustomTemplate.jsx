import React, { useState } from 'react'
import { createDesign } from '../../actions/design_actions'
import { connect } from 'react-redux'
import styles from './createCustomTemplate.module.css'
import { useLocation } from 'react-router-dom'

const CreateCustomTemplate = props => {
  let { closeModal } = props
  let [height, setHeight] = useState(800)
  let [width, setWidth] = useState(800)
  const location = useLocation()
  const path = location.pathname.includes('/folder/')
    ? location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
    : null

  const createDesign = (width, height) => {
    const { createDesign, currentUser, folder } = props

    const design = {
      creatorId: currentUser?.id,
      title: `Untitled Design`,
      description: '',
      isPublic: false,
      isTemplate: false,
      isApproved: null,
      width: width,
      height: height,
      folderId: path ? path : null
    }
    createDesign(design).then(res => {
      window.location.href = `#/design/${res.payload.data.result.designs.id}`
    })
  }

  const handleWidth = value => {
    let width = Number(value)
    setWidth(width)
  }

  const handleHeight = value => {
    let height = Number(value)
    setHeight(height)
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalBody}>
        <div className={styles.modalClose} onClick={closeModal} />
        <div className={styles.modalHead}>Create new Design</div>
        <div className={styles.modalContent}>
          Set dimensions of your template
          <div className={styles.dimensionsWrapper}>
            <div className={styles.dimensionsBlock}>
              <label>width:</label>
              <input type="text" onBlur={event => handleWidth(event.target.value)} />
            </div>
            <div className={styles.dimensionsBlock}>
              <span>X</span>
            </div>
            <div className={styles.dimensionsBlock}>
              <label>height:</label>
              <input type="text" onBlur={event => handleHeight(event.target.value)} />
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button type="button" onClick={() => createDesign(width, height)}>
            Create
          </button>
        </div>
      </div>
    </div>
  )
}

export default connect(
  state => {
    return {
      currentUser: state.entities.users[state.session.id]
    }
  },
  dispatch => ({
    createDesign: design => dispatch(createDesign(design))
  })
)(CreateCustomTemplate)
