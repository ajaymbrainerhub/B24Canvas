import * as React from 'react'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Chip from '@mui/material/Chip'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import DoneIcon from '@mui/icons-material/Done'
import styles from './PricingPlans.module.css'
import { Divider } from '@mui/material'
import { Link } from 'react-router-dom'

export default function PlanCard(props) {
  const { title, subheader, price, oldPrice, buttonVariant, buttonText, description, optimalBadge } = props.tier
  let btnstyle =
    buttonVariant === 'contained' ? { backgroundColor: '#1e75ff', borderRadius: '10px' } : { borderRadius: '10px' }

  return (
    <Card
      key={props.key}
      variant="outlined"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderColor: optimalBadge ? '#7ba8fc' : 'whitesmoke',
        borderWidth: '1px',
        borderRadius: '15px',
        height: '100%'
      }}
    >
      <CardHeader
        title={title}
        subheader={subheader}
        titleTypographyProps={{
          align: 'left',
          sx: {
            fontSize: '1.3vw',
            fontWeight: 'bold'
          }
        }}
        action={
          optimalBadge ? (
            <Chip
              label="Popular"
              sx={{
                width: '6vw',
                height: '2vw',
                backgroundColor: '#3dd598',
                color: 'white'
              }}
            />
          ) : null
        }
        subheaderTypographyProps={{
          align: 'left',
          sx: { fontSize: '1vw' }
        }}
      />
      <CardContent sx={{ paddingTop: 0 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline'
          }}
        >
          <p className={styles.main_price}>${price}</p>

          <p className={styles.secondary_price}>${oldPrice}</p>
        </div>
        <Divider sx={{ margin: '4% 0 0% 0' }}></Divider>
        <List>
          {description.map((line, i) => (
            <ListItem disablePadding key={i}>
              <DoneIcon key={i} fontSize="medium" sx={{ color: 'mediumaquamarine' }}></DoneIcon>

              <ListItemText key={i} primary={<p className={styles.list_item}>{line}</p>} sx={{ marginLeft: '1vw' }} />
            </ListItem>
          ))}
        </List>
      </CardContent>
      <CardActions sx={{ marginTop: 'auto' }}>
        <Button component={Link} to="/checkout" fullWidth variant={buttonVariant} sx={btnstyle}>
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  )
}
