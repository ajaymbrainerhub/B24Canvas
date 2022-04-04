import React, { Fragment } from 'react'

import { Dialog, DialogActions, Typography } from '@material-ui/core'

import styles from './styles.module.css'

function TemplateSuccessPopup({ isOpen, headerIcon, title, subTitle, children, actionButtons, callback }) {
  return (
    <Dialog open={isOpen} onClose={callback} className={styles.successModel}>
      <div className={styles.success_centerContent}>
        {/* header section */}
        <div className={styles.success_centerContentIcon}>{headerIcon}</div>
        <Typography className={styles.success_centerContentTitle}>{title}</Typography>
        <Typography className={styles.success_centerContentText}>{subTitle}</Typography>

        {/* body section */}
        {children}

        {/* buttons section */}
        <DialogActions className={styles.success_centerContentBtn}>
          {actionButtons.map((actionButton, idx) => (
            <Fragment key={idx}>{actionButton}</Fragment>
          ))}
        </DialogActions>
      </div>
    </Dialog>
  )
}

export default TemplateSuccessPopup
