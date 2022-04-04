import * as React from 'react'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CardData from './CardData'
import { publishableKeyGet } from './functions'
import { VisaIcon, MastercardIcon } from '../../assets/svg'
import SVG from 'react-inlinesvg'

export default function CardPayment(props) {
  const [stripePromise, setStripePromise] = useState(null)

  const [payment, setPayment] = useState('creditCard')

  useEffect(() => {
    const retrievePublishableKey = async () => {
      const publishableKey = await publishableKeyGet()
      const stripe = loadStripe(publishableKey)
      setStripePromise(stripe)
    }
    retrievePublishableKey()
  }, [])

  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '15px',
        height: '100%'
      }}
    >
      <CardContent style={{ paddingTop: '5%', paddingBottom: '5%' }}>
        <RadioGroup name="radio-buttons-group" value={payment} onChange={e => setPayment(e.target.value)}>
          <FormControlLabel value="PayPal" control={<Radio />} label={<img src="./icons/paypal.svg" alt="Paypal" />} />
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <FormControlLabel value="creditCard" control={<Radio />} label="Credit Card" />
            <Box
              sx={{
                display: 'flex'
              }}
            >
              <SVG src={VisaIcon} style={{ width: '3rem', height: 'auto', marginRight: '1rem' }} />
              <SVG src={MastercardIcon} style={{ width: '3rem', height: 'auto' }} />
            </Box>
          </Box>
        </RadioGroup>
        <Elements stripe={stripePromise}>
          <CardData disabled={payment !== 'creditCard'} />
        </Elements>
      </CardContent>
    </Card>
  )
}
