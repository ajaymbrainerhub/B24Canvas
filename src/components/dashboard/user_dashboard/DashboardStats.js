import React from 'react'
import { Grid } from '@material-ui/core'
import StatsItem from './StatsItem'

function Stats({ stats }) {
  return (
    <Grid container className="userDashboardAction">
      {stats.map(stat => (
        <Grid item key={stat.name} sm={6} md={4} lg={2}>
          <StatsItem name={stat.name} value={stat.value} />
        </Grid>
      ))}
    </Grid>
  )
}

export default Stats
