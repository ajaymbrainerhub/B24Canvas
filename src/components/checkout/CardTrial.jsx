import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import styles from './Checkout.module.css'
import { Button, CardActions } from '@mui/material'
export default function CardTrial() {
  return (
    <Card
      variant="outlined"
      className={styles.trial_card}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '15px',
        height: '100%'
      }}
    >
      <CardContent>
        <div className={styles.trial_card_header}>
          <div className={styles.trial_card_header_inner}>
            <p>Pro</p>

            <span>(Billed yearly)</span>
          </div>

          <p>9.99$</p>
        </div>

        <Divider />
        <Link href="#">
          <p>Have a promo code</p>
        </Link>
        <Divider />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p>Today you pay (in US dollars)</p>
          <p>0$</p>
        </div>
        <p>After 21 days: 119$</p>
      </CardContent>

      <CardActions sx={{ marginTop: 'auto' }}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: '#1e75ff',
            borderRadius: '10px',
            height: '3rem'
          }}
        >
          Try for free for 7 days
        </Button>
      </CardActions>
    </Card>
  )
}
