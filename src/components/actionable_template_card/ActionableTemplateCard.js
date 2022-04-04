import React, { useState } from 'react'

import { Card, CardContent, Typography, Button, Popover } from '@material-ui/core'
import { MoreHoriz } from '@material-ui/icons'

import styles from './styles.module.css'

function ActionableTemplateCard({ design, render }) {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Card className={styles.card}>
      <CardContent className={styles.cardInner}>
        <img
          src={encodeURI(
            `${process.env.REACT_APP_MEDIA_URL}/cloud/${process.env.REACT_APP_BOT_ID}/${design.email}/Canvas/All designs/${design.id}.png`
          )}
          alt=""
        />
        <Button aria-describedby={design.id} onClick={handleClick}>
          <MoreHoriz />
        </Button>
        <Popover
          id={design.id}
          open={!!anchorEl}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
        >
          {render(handleClose)}
        </Popover>
      </CardContent>
      <div className={styles.cardInfo}>
        <Typography>{design.title}</Typography>
        {design.subTitle ? <Typography>{design.subTitle}</Typography> : null}
      </div>
    </Card>
  )
}

export default ActionableTemplateCard
