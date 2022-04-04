import React, { Fragment } from 'react'

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid } from '@material-ui/core'

import TemplateItem from '../dashboard/user_dashboard/TemplateItem'

function TemplatesPopup({
  templates,
  isOpen,
  callback,
  handleTemplateSelected,
  selectedTemplates,
  title,
  subTitle,
  actionButtons
}) {
  const isSelected = id => {
    let flag = false
    for (let template of selectedTemplates) {
      if (template.id === id) {
        flag = true
      }
    }
    return flag
  }

  return (
    <Dialog open={isOpen} onClose={callback}>
      <DialogContent className="viewDialog-inner">
        <DialogTitle className="viewDialog-inner__title">{title}</DialogTitle>
        <DialogContentText className="viewDialog-inner__subtitle">{subTitle}</DialogContentText>
        <Grid container justifyContent="flex-start">
          {templates.map(({ id, name, category, isForSale }) => (
            <Grid
              item
              key={id}
              className={isSelected(id) ? 'selectedCard' : ''}
              onClick={() => handleTemplateSelected({ id, name, category })}
            >
              <TemplateItem name={name} category={category} isForSale={isForSale} />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions className="viewDialog-footer">
        {actionButtons.map((button, idx) => (
          <Fragment key={idx}>{button}</Fragment>
        ))}
      </DialogActions>
    </Dialog>
  )
}

export default TemplatesPopup
