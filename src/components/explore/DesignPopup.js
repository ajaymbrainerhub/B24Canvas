import React, { useState, useEffect } from 'react'
import { Avatar, Dialog, Typography, Grid } from '@material-ui/core'
import { FavoriteBorder } from '@material-ui/icons'
import { getUserById } from '../../actions/session_actions'
import styles from './Explore.module.css'
import { connect } from 'react-redux'

function DesignPopup({ creatorId, creator, isOpen, designInfo, closeCalback, actionButton, creatorInfo, GetUser }) {
  useEffect(() => {
    GetUser(creatorId)
  }, [creatorId])

  return (
    <Dialog open={isOpen} onClose={closeCalback}>
      {designInfo ? (
        <Grid container className={styles.mediaContentPopUp} alignItems="center">
          <Grid item xs={12} sm={12} md={7} className={styles.mediaContentImg}>
            <img
              src={encodeURI(
                `${process.env.REACT_APP_MEDIA_URL}/cloud/${process.env.REACT_APP_BOT_ID}/${designInfo?.email}/Canvas/All designs/${designInfo.id}.png`
              )}
              alt={designInfo.title}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={5} className={styles.PublishUser}>
            <Typography className={styles.PublishUser__title}>Creator</Typography>
            <Grid container className={styles.PublishUser__box} alignItems="center">
              <Avatar
                src={`${process.env.REACT_APP_MEDIA_URL}/${creator?.avatar}`}
                className={styles.PublishUser__img}
              />
              <Typography className={styles.PublishUser__name}>{`${creator?.firstName} ${
                creator?.lastName ? creator.lastName : ''
              }`}</Typography>
            </Grid>
            <div className={styles.templateInfo}>
              <Typography className={styles.tamplateTitle}>{designInfo.title}</Typography>
              {designInfo.isPaid ? (
                <Typography className={styles.confirmCardAmount}>{designInfo.price}</Typography>
              ) : null}
            </div>
            <Typography className={styles.tamplateType}>{designInfo.type}</Typography>
            <Grid container alignItems="center">
              {actionButton}
              <div className={styles.likeBtn}>
                <FavoriteBorder />
              </div>
            </Grid>
          </Grid>
        </Grid>
      ) : null}
    </Dialog>
  )
}

export default connect(
  (state, ownProps) => {
    return {
      creator: state.entities.users[ownProps.creatorId]
    }
  },
  dispatch => ({
    GetUser: id => dispatch(getUserById(id))
  })
)(DesignPopup)
