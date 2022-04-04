import React from 'react'

import { Grid, Button } from '@material-ui/core'
import { FavoriteBorder } from '@material-ui/icons'
import TransferActionItem from './TransferActionItem'

function DashboardActions({ view, setView }) {
  return (
    <Grid container justifyContent="space-between" alignItems="center" className="userDashboardActions">
      <Grid item md={6} sm={12}>
        <Grid container justifyContent="flex-start" alignItems="center" className="userDashboardActions__leftBtn">
          <TransferActionItem icon={FavoriteBorder} text="Bank Transfer" />
          <TransferActionItem icon={FavoriteBorder} text="Transfer Way2" />
        </Grid>
      </Grid>
      <Grid item md={6} sm={12}>
        <Grid container justifyContent="flex-end" alignItems="center" className="userActionsBtns">
          <Grid item>
            <Button
              variant="outlined"
              className={view === 'dashboard' ? 'btn--bue' : ''}
              onClick={() => setView('dashboard')}
            >
              Dashboard
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              className={view === 'myTemplates' ? 'btn--bue' : ''}
              onClick={() => setView('myTemplates')}
            >
              My Templates
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default DashboardActions
