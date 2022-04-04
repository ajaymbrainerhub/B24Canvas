import * as React from 'react'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Carousel from 'react-material-ui-carousel'
import { Link } from 'react-router-dom'
import CardSubscription from './CardSubscription'
import CardPayment from './CardPayment'
import CardTrial from './CardTrial'
import tiers from '../Pricingplan/priceData'
import styles from './Checkout.module.css'
import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import DoneIcon from '@mui/icons-material/Done'

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
    <div className={styles.container}>
      <Button
        sx={{
          borderRadius: '25px',
          backgroundColor: 'whitesmoke',
          color: 'black',
          textTransform: 'capitalize',
          fontWeight: 'bold',
          fontSize: '0.7vw'
        }}
      >
        Back
      </Button>

      <div className={styles.bar}>
        <h1>Try canvas for free</h1>
        <Link to="#">
          <p>Skip for now</p>
        </Link>
      </div>

      <List
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          margin: '2vh 0 2vh 0',
          width: '65%'
        }}
      >
        {tiers[0].description.map((line, i) => (
          <ListItem key={i} sx={{ padding: '0.3em' }}>
            <DoneIcon key={i} fontSize="medium" sx={{ color: 'mediumaquamarine' }}></DoneIcon>
            <ListItemText key={i} primary={line} sx={{ marginLeft: '1em' }} />
          </ListItem>
        ))}
      </List>

      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <CardSubscription card={cardInfo[0]} />
        </Grid>
        <Grid item xs={12} md={6}>
          <CardSubscription card={cardInfo[1]} />
        </Grid>
      </Grid>
      <Grid container spacing={1} sx={{ marginTop: '0.8vh' }}>
        <Grid item xs={12} md={6}>
          <CardPayment />
        </Grid>
        <Grid item xs={12} md={6}>
          <CardTrial />
        </Grid>
      </Grid>
    </div>
  )
}
function LeftPane({}) {
  var carouselText = [
    {
      name: 'Random Name #1',
      description: 'Probably the most random thing you have ever seen!'
    },
    {
      name: 'Random Name #2',
      description: 'Hello World!'
    }
  ]
  function CarouselPage(props) {
    return (
      <Paper
        sx={{
          backgroundColor: 'blue',
          backgroundImage: 'linear-gradient(330deg, darkslateblue, dodgerblue)',
          height: '100vh'
        }}
      >
        <div
          style={{
            textAlign: 'center',
            width: '100%',
            color: 'white',
            position: 'absolute',
            marginTop: '75vh'
          }}
        >
          <h2>{props.page.name}</h2>
          <p>{props.page.description}</p>
        </div>
      </Paper>
    )
  }
  return (
    <Carousel
      navButtonsAlwaysInvisible
      stopAutoPlayOnHover
      autoPlay="false"
      swipe
      indicatorContainerProps={{
        style: {
          position: 'absolute',
          marginTop: '-15vh'
        }
      }}
      activeIndicatorIconButtonProps={{
        style: {
          color: 'red'
        }
      }}
    >
      {carouselText.map((page, i) => (
        <CarouselPage key={i} page={page} />
      ))}
    </Carousel>
  )
}

export default function CheckoutPage() {
  return (
    <Grid container>
      <Grid item xs={0} md={6}>
        <LeftPane />
      </Grid>

      <Grid item xs={12} md={6}>
        <RightPane />
      </Grid>
    </Grid>
  )
}
