import React from 'react'

import { Button, Typography } from '@material-ui/core'

function EmptyPage() {
  return (
    <div className="Settingstemplate fullWidth">
      <div className="centerContent">
        <img src="folder.png" style={{ height: '110px', width: '110px' }} className="centerContent__Img" />
        <Typography className="centerContent__Title">You don't have purchased any templates yet</Typography>
        <Typography className="centerContent__text">
          You can explore now from thousands of templates from ____ and people around the world
        </Typography>
        <Button variant="contained" className="blueBtn">
          Explore
        </Button>
      </div>
    </div>
  )
}

export default EmptyPage
