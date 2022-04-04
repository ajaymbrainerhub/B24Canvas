import React from 'react'

import { Grid, Switch, Typography } from '@material-ui/core'

function NotificationItem({ title, description, enabled }) {
  return (
    <Grid container justifyContent="space-between" className="whiteCard">
      <Grid item sm={9} md={9}>
        <Typography className="notificationTitle">{title}</Typography>
        <Typography className="notificationText">{description}</Typography>
      </Grid>
      <Grid item className="Settingstemplatetoggle">
        <Switch defaultChecked={enabled} />
      </Grid>
    </Grid>
  )
}

export default NotificationItem
