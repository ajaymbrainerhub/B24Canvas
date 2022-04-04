import React from 'react'
import { Grid, Button } from '@material-ui/core'

function TransferActionItem({ icon: Icon, text }) {
  return (
    <Grid container>
      <Grid item>
        <Button>
          {' '}
          <Icon />
        </Button>
      </Grid>
      <Grid item>{text}</Grid>
    </Grid>
  )
}

export default TransferActionItem
