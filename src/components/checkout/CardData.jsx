import React, { useState } from 'react'
import { TextField, Grid } from '@material-ui/core'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { CardCvcElement, CardNumberElement, CardExpiryElement, PaymentElement } from '@stripe/react-stripe-js'
import StripeInput from './StripeInput'
import styles from './CardData.module.css'
import { VisaIcon, MastercardIcon } from '../../assets/svg'
import SVG from 'react-inlinesvg'

const CardData = props => {
  const [data, setData] = useState({
    cardType: 'visa',
    cardInfo: { CVC: '', expireDate: '', CCnumber: '' }
  })

  const handleChange = event => {
    setData({ ...data, [event.target.name]: event.target.value })
  }

  return (
    <div
      style={{
        opacity: props.disabled ? 0.25 : 1,
        pointerEvents: props.disabled ? 'none' : 'initial'
      }}
    >
      <div className={styles.bar}>
        <FormControl size="small">
          <Select
            name="cardType"
            label="Credit card type"
            value={data.cardType}
            onChange={handleChange}
            size="small"
            sx={{ height: '5vh' }}
            SelectDisplayProps={{ style: { paddingTop: 10, paddingBottom: 10 } }}
          >
            <MenuItem value="visa">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <SVG src={VisaIcon} style={{ width: '30', height: '30' }} />
                <span style={{ marginLeft: '1em' }}>Visa</span>
              </div>
            </MenuItem>
            <MenuItem value="mastercard">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <SVG src={MastercardIcon} style={{ width: '30', height: '30' }} />
                <span style={{ marginLeft: '1em' }}>Master Card</span>
              </div>
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl>
          <TextField
            style={{ marginLeft: '10px' }}
            size="small"
            label="Expiry Date"
            name="ccexp"
            variant="outlined"
            required
            value={data.cardInfo.expireDate}
            InputProps={{
              inputProps: {
                component: CardExpiryElement
              },
              inputComponent: StripeInput
            }}
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>

        <FormControl>
          <TextField
            style={{ marginLeft: '100%' }}
            size="small"
            label="CVC"
            name="cvc"
            variant="outlined"
            required
            value={data.cardInfo.CVC}
            InputProps={{
              inputProps: {
                component: CardCvcElement
              },
              inputComponent: StripeInput
            }}
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>
      </div>

      <FormControl fullWidth style={{ marginTop: '5%' }}>
        <TextField
          size="small"
          label="Credit Card Number"
          name="ccnumber"
          variant="outlined"
          required
          value={data.cardInfo.CCnumber}
          InputProps={{
            inputComponent: StripeInput,
            inputProps: {
              component: CardNumberElement
            }
          }}
          InputLabelProps={{ shrink: true }}
        />
      </FormControl>
    </div>
  )
}

export default CardData
