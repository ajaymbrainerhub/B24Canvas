import React, { Fragment } from 'react'

import { Typography, Button, Grid } from '@material-ui/core'
import { CreateNewFolderOutlined } from '@material-ui/icons'
import SVG from 'react-inlinesvg'
import ActionableTemplateCard from '../actionable_template_card/ActionableTemplateCard'
import styles from './DeletedDesigns.module.css'
import { TrashBinIcon, UploadIcon } from '../../assets/svg'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { requestDesigns, deleteDesign, requestTemplates } from '../../actions/design_actions'

function Uploads({ templates, getTemplates }) {
  useEffect(() => {
    getTemplates()
  }, [])

  if (!templates.length) {
    return (
      <div className={styles.centerBox}>
        <div className={styles.centerBoxImage}>
          <SVG src={UploadIcon} style={{ height: '125px', width: '75px' }} />
        </div>
        <Typography className={styles.centerBoxTitle}>You have no uploads yet</Typography>
        <Typography className={styles.centerBoxText}>Your uploaded templates</Typography>
      </div>
    )
  }

  return (
    <div className={styles.uploadTemplates}>
      <h2>Uploads</h2>
      <div className={styles.uploadsAllCards}>
        {templates.map((template, idx) => (
          <Fragment key={idx}>
            <ActionableTemplateCard
              design={template}
              render={closeMenu => (
                <>
                  <Button>
                    <Typography>Something</Typography>
                  </Button>
                  <Button>
                    <Typography>Something2</Typography>
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
    const templates = Object.values(state.entities.templates)
    return {
      currentUser: state.entities.users[state.session.id],
      templates: templates.filter(template => template.creatorId === state.session.id)
    }
  },
  dispatch => ({
    getTemplates: () => {
      dispatch(requestTemplates('?isTemplate=true', true))
    }
  })
)(Uploads)
