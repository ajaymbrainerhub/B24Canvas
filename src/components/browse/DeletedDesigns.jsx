import React, { Fragment } from 'react'
import { Typography, Button, Grid } from '@material-ui/core'
import { CreateNewFolderOutlined } from '@material-ui/icons'
import SVG from 'react-inlinesvg'
import ActionableTemplateCard from '../actionable_template_card/ActionableTemplateCard'
import styles from './DeletedDesigns.module.css'
import { TrashBinIcon } from '../../assets/svg'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { requestDesigns,deleteDesign ,updateDesign} from '../../actions/design_actions'

function DeletedDesigns({designs, getDesigns, DeleteDesign, currentUser, UpdateDesign}) {
  
  const handleDeleteTemplate = designId => {
    DeleteDesign(designId, currentUser)
  }
  
  const restoreFromTrash = (design) => {
    UpdateDesign({ ...design, trash:false})
  }

  useEffect(() => {
    getDesigns()
  }, [])

  if (!designs.length) {
    return (
      <div className={styles.centerBox}>
        <div className={styles.centerBoxImage}>
          <SVG src={TrashBinIcon} style={{ height: '125px', width: '75px' }} />
        </div>
        <Typography className={styles.centerBoxTitle}>Trash is empty</Typography>
        <Typography className={styles.centerBoxText}>
          Any designs you delete will appear here, you have 60 days to restore them before they delete permanently
        </Typography>
      </div>
    )
  }

  return (
    <div className={styles.uploadTemplates}>
      <h2>Trash</h2>
      <div className={styles.uploadsAllCards}>
        {designs.map((design, idx) => (
          <Fragment key={idx}>
            <ActionableTemplateCard
              design={design}
              render={closeMenu => (
                <>
                  <Button
                   onClick={() => {
                    restoreFromTrash(design)
                    closeMenu()
                  }}
                  >
                    <Typography>Restore</Typography>
                  </Button>
                  <Button
                    onClick={() => {
                      handleDeleteTemplate(design.id)
                      closeMenu()
                    }}
                  >
                    <Typography>Delete permanently</Typography>
                  </Button>
                </>
              )}
            />
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default connect(
  state => {
    const designs = Object.values(state.entities.designs)
    return {
      currentUser: state.entities.users[state.session.id],
      designs: designs.filter(design => design.trash)
    }
  },
  dispatch => ({
    getDesigns: () => {
      dispatch(requestDesigns(''))
    },
    DeleteDesign: (designId, currentUser) => dispatch(deleteDesign(designId, currentUser)),
    UpdateDesign: (design) => {
      dispatch(updateDesign(design))
    }
  }
  )
)(DeletedDesigns)
