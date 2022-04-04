import React, { memo } from 'react'

import styles from '../styles.scss'

import { Card, CardContent, Typography } from '@material-ui/core'

function TemplateItem({ name, category, isForSale, image }) {
  return (
    <div className="templatecard-block">
      <Card className={isForSale ? 'templateItem templatecard showSale' : 'templateItem templatecard'} raised>
        {category ? (
          <CardContent className="templatecard__title">
            <Typography>{category}</Typography>
          </CardContent>
        ) : null}
        <div className="templatecard__img">{image ? <img src={image} /> : null}</div>
        {isForSale ? <Typography className="templatecard__name">For Sale</Typography> : null}
      </Card>
      <Typography className="templatecard__heading">{name}</Typography>
    </div>
  )
}

export default memo(TemplateItem)
