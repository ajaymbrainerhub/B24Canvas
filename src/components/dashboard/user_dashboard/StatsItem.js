import { Typography, Grid } from '@material-ui/core'
import React from 'react'

function StatsItem({ name, value }) {
  return (
    <Grid container>
      <Grid item sm={12} md={12}>
        <Typography className="userStatusTitle">{name}</Typography>
      </Grid>
      <Grid item sm={12} md={12}>
        <Typography className="userStatusValue">{value}</Typography>
      </Grid>
    </Grid>
  )
}

export default StatsItem
