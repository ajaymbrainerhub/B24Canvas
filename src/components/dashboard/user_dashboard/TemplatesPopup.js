import React, { useState, useEffect } from 'react'

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Grid } from '@material-ui/core'

import TemplateItem from './TemplateItem'
import TemplateInfoPopup from './TemplateInfoPopup'

function TemplatesPopup({ templates, isOpen, callback }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [isTemplateInfoOpen, setIsTemplateInfoOpen] = useState(false)

  useEffect(() => {
    return () => setSelectedTemplate(null)
  }, [isOpen])

  const handleTemplateSelected = template => {
    setSelectedTemplate(template)
  }

  const templateInfoCallback = isPublished => {
    setIsTemplateInfoOpen(false)
    isPublished && callback()
  }

  return (
    <>
      <Dialog open={isOpen} onClose={callback}>
        <DialogContent className="viewDialog-inner">
          <DialogTitle className="viewDialog-inner__title">Sell Template</DialogTitle>
          <DialogContentText className="viewDialog-inner__subtitle">Pick one template to sell</DialogContentText>
          <Grid container justifyContent="flex-start">
            {templates.map(({ id, name, category, isForSale }) => (
              <Grid
                item
                key={id}
                className={selectedTemplate?.id === id && 'selectedCard'}
                onClick={() => handleTemplateSelected({ id, name, category })}
              >
                <TemplateItem name={name} category={category} isForSale={isForSale} />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions className="viewDialog-footer">
          <Button onClick={callback}>Back to edit</Button>
          <Button onClick={() => setIsTemplateInfoOpen(true)} disabled={!selectedTemplate}>
            Next
          </Button>
        </DialogActions>
      </Dialog>
      <TemplateInfoPopup isOpen={isTemplateInfoOpen} callback={templateInfoCallback} />
    </>
  )
}

export default TemplatesPopup
