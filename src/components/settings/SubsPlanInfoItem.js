import React from 'react'

import { Typography } from '@material-ui/core'
import './settings.scss'

function SubsPlanInfoItem({ name, value }) {
  return (
    <div>
      <Typography className="accountStatusName">{name}</Typography>
      <Typography className="accountStatusValue">{value}</Typography>
    </div>
  )
}

export default SubsPlanInfoItem
