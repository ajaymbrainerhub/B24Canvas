import React from 'react'

import { Avatar, Dialog, DialogActions, Typography, Grid } from '@material-ui/core'

import styles from './Explore.module.css'

function ConfirmDesignPopup({ isOpen, title, designInfo, creatorInfo, closeCallback, actionButton }) {
  return (
    <Dialog open={isOpen} onClose={closeCallback}>
      <Grid className={styles.confirmOrderPopup}>
        <Typography className={styles.confirmOrderPopupTitle}>{title}</Typography>
        {designInfo ? (
          <Grid container className={styles.confirmCard}>
            <Grid item className={styles.confirmCardImg}>
              <img src={designInfo.imgURL} />
            </Grid>

            <Grid item className={styles.confirmCardInfo}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Typography className={styles.confirmCardName}>{designInfo.title}</Typography>
                {designInfo.isPaid ? (
                  <Typography className={styles.confirmCardAmount}>{designInfo.price}</Typography>
                ) : null}
              </Grid>
              <Typography className={styles.confirmCardType}>{designInfo.type}</Typography>
              <Grid container alignItems="center">
                <Avatar src={creatorInfo.profilePic} className={styles.PublishUserImage} />
                <Typography className={styles.PublishUser__name}>Creator</Typography>
              </Grid>
            </Grid>
          </Grid>
        ) : null}
        <DialogActions className={styles.confirmBtns}>{actionButton}</DialogActions>
      </Grid>
    </Dialog>
  )
}

export default ConfirmDesignPopup
