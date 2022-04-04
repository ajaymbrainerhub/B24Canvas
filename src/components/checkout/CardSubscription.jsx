import * as React from 'react'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Chip from '@mui/material/Chip'
import styles from './Checkout.module.css'

export default function CardSubscription(props) {
  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '15px'
      }}
    >
      <CardHeader
        title={
          <div className={styles.cardHeader}>
            <p>{props.card.title}</p>
            {props.card.bestValue ? (
              <Chip
                label="Best value"
                sx={{
                  backgroundColor: 'crimson',
                  color: 'white',
                  padding: '0',
                  fontSize: '1rem',
                  marginLeft: '4rem',
                  height: '2.3rem'
                }}
              />
            ) : null}
          </div>
        }
        subheader={props.card.subheader}
        titleTypographyProps={{ align: 'left' }}
        subheaderTypographyProps={{
          align: 'left'
        }}
      />
      <CardContent>
        <div className={styles.priceBar}>
          <p>{props.card.price}</p>
          <span>{props.card.pricePerMonth ? props.card.pricePerMonth : null}</span>
        </div>
      </CardContent>
    </Card>
  )
}
