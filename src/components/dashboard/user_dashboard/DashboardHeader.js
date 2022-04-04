import React from 'react'
import { Grid, Avatar, Typography, Button } from '@material-ui/core'
import { Settings } from '@material-ui/icons'
import { connect } from 'react-redux'

function DashboardHeader({ currentUser }) {
  return (
    <Grid container justifyContent="space-between" className="userHeader">
      <Grid item sm={9} md={9}>
        <Grid container alignItems="center">
          <div className="userHeader__img">
            <Avatar src={`${process.env.REACT_APP_MEDIA_URL}/${currentUser?.avatar}`} />
          </div>
          <div>
            <Typography className="userHeader__name">{`Stats for ${currentUser.firstName} ${
              currentUser.lastName ? currentUser.lastName : ``
            }`}</Typography>
            <Typography className="userHeader__status">{currentUser.email}</Typography>
          </div>
        </Grid>
      </Grid>
      <Grid item sm={3} md={3} justifyContent="flex-end" alignItems="flex-start" className="userHeader__Btn-block">
        <Button className="userHeader__Btn">
          <Settings />
          <Typography className="userHeader__settingBtn">Settings</Typography>
        </Button>
      </Grid>
    </Grid>
  )
}

export default connect(state => {
  return {
    currentUser: state.entities.users[state.session.id]
  }
})(DashboardHeader)
