import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Carousel from 'react-material-ui-carousel'

import CardSubscription from './CardSubscription'
import CardPayment from './CardPayment'
import CardTrial from './CardTrial'
import tiers from '../Pricingplan/priceData'

function Item(props) {
  return (
    <Paper style={{ backgroundColor: 'blue', height: '100vh' }}>
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>
    </Paper>
  )
}

function RightPane() {
  const cardInfo = [
    {
      title: 'Yearly',
      subheader: 'some description',

      price: '$119',
      pricePerMonth: '9.99/month',
      bestValue: true
    },
    {
      title: 'Monthly',
      subheader: 'some description',

      price: '$12.99',
      pricePerMonth: '',
      bestValue: false
    }
  ]

  return (
    <Container style={{ height: '100vh', marginTop: '30px' }}>
      <Button>Back</Button>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px', marginBottom: '30px' }}>
        <Typography component="h4" variant="h5" color="text.primary" sx={{ marginBottom: '10px' }}>
          Try canvas for free
        </Typography>

        <Typography component="h6" variant="h7" color="text.secondary" sx={{ marginBottom: '10px' }}>
          Skip for now
        </Typography>
      </Box>
      <ul className="grid-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
        {tiers[0].description.map(line => (
          <Typography component="li" variant="subtitle1" align="left" key={line}>
            {line}
          </Typography>
        ))}
      </ul>
      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={6}>
          <CardSubscription card={cardInfo[0]} />
        </Grid>
        <Grid item xs={6}>
          <CardSubscription card={cardInfo[1]} />
        </Grid>
        <Grid item xs={6}>
          <CardPayment />
        </Grid>
        <Grid item xs={6}>
          <CardTrial />
        </Grid>
      </Grid>
    </Container>
  )
}
function LeftPane({}) {
  var items = [
    {
      name: 'Random Name #1',
      description: 'Probably the most random thing you have ever seen!'
    },
    {
      name: 'Random Name #2',
      description: 'Hello World!'
    }
  ]
  return (
    <Carousel
      indicatorContainerProps={{
        style: {
          position: 'absolute',
          marginTop: '-250px' // 5
        }
      }}
    >
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  )
}
export default function CheckoutPage() {
  return (
    <Grid container>
      <Grid item xs={6}>
        <LeftPane />
      </Grid>

      <Grid item xs={6}>
        <RightPane></RightPane>
      </Grid>
    </Grid>
  )
}
