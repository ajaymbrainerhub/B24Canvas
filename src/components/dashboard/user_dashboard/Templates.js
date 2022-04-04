import React, { useState } from 'react'

import { Button, Grid, Typography } from '@material-ui/core'
import TemplateItem from './TemplateItem'
import TemplatesPopup from '../../templates_popup/TemplatesPopup'
import TemplateInfoPopup from './TemplateInfoPopup'
import TemplateSellFinalPopup from './TemplateSellFinalPopup'

const templates = [
  { id: '1', name: 'Template 1', category: 'Food', isForSale: true },
  { id: '2', name: 'Template 2', category: 'Food', isForSale: false },
  { id: '3', name: 'Template 3', category: 'Food', isForSale: true },
  { id: '4', name: 'Template 4', category: 'Food', isForSale: true },
  { id: '5', name: 'Template 5', category: 'Food', isForSale: false },
  { id: '6', name: 'Template 6', category: 'Food', isForSale: false }
]

function Templates() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedTemplates, setSelectedTemplates] = useState([])
  const [isTemplateInfoOpen, setIsTemplateInfoOpen] = useState(false)
  const [isFinalPopupOpen, setIsFinalPopupOpen] = useState(false)

  const templatePopupCloseCallback = () => {
    setIsPopupOpen(false)
    setSelectedTemplates([])
  }

  const handleTemplateSelected = template => {
    setSelectedTemplates([template])
  }

  const templateInfoCloseCallback = isPublished => {
    setIsTemplateInfoOpen(false)
    isPublished && templatePopupCloseCallback()
  }

  const templateInfoPublishedCallback = () => {
    setIsFinalPopupOpen(true)
    templateInfoCloseCallback(true)
  }

  const finalPopupCallback = () => {
    setIsFinalPopupOpen(false)
  }

  const actionButtons = [
    <Button onClick={templatePopupCloseCallback}>Back to edit</Button>,
    <Button onClick={() => setIsTemplateInfoOpen(true)} disabled={!selectedTemplates.length}>
      Next
    </Button>
  ]

  return (
    <>
      <Grid container justifyContent="space-between" className="UserTemaplateHeader">
        <Grid item>
          <Typography className="UserTemaplateHeader__title">My designs</Typography>
        </Grid>
        <Grid item className="UserTemaplateHeader__btns">
          <Button variant="contained" onClick={() => setIsPopupOpen(true)}>
            Sell Designs
          </Button>
          <Button variant="outlined">View All</Button>
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-start">
        {templates.map(({ id, name, category, isForSale }) => (
          <Grid item key={id}>
            <TemplateItem name={name} category={category} isForSale={isForSale} />
          </Grid>
        ))}
      </Grid>
      <TemplatesPopup
        title="Sell Templates"
        subTitle="Pick one templates to sell"
        templates={templates}
        selectedTemplates={selectedTemplates}
        handleTemplateSelected={handleTemplateSelected}
        isOpen={isPopupOpen}
        callback={templatePopupCloseCallback}
        actionButtons={actionButtons}
      />
      <TemplateInfoPopup
        isOpen={isTemplateInfoOpen}
        callbackClose={templateInfoCloseCallback}
        callbackPublished={templateInfoPublishedCallback}
      />
      <TemplateSellFinalPopup isOpen={isFinalPopupOpen} callback={finalPopupCallback} />
    </>
  )
}

export default Templates
