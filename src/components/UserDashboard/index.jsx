import React, { useState } from 'react'
import { Box } from '@mui/system'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import UserStats from './UserStats'
import DashboardChart from './DashboardChart'
import UserOrderTable from './UserOrderTable'

import styles from './UserDashboard.module.css'

export default function UserDashboard() {
  const [data, setData] = useState({
    cardType: '',
    email: '',
    password: '',
    passwordConfirm: ''
  })

  const handleChange = event => {
    setData({ ...data, [event.target.name]: event.target.value })
  }

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Box className={styles.userBar}>
            <Box className={styles.userProfile}>
              <img className={styles.userPic} src="./icons/visa.svg" />
              <div className={styles.userName}>
                <Typography variant="h5" color="text.primary">
                  Stats for John Smith
                </Typography>

                <Typography variant="h6" color="text.primary">
                  username
                </Typography>
              </div>
            </Box>

            <Box className={styles.userProfile}>
              <img className={styles.userPic} src="./icons/visa.svg" />
              <div className={styles.userName}>
                <Typography variant="h6" color="text.secondary">
                  Settings
                </Typography>
              </div>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box className={styles.userBar}>
            <div>
              <Button>One</Button>
              <Button>Two</Button>
            </div>
            <div>
              <Button>Dashboard</Button>
              <Button>My templates</Button>
            </div>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <UserStats />
        </Grid>
        <Grid item xs={6}>
          <DashboardChart />
        </Grid>
        <Grid item xs={6}>
          <DashboardChart />
        </Grid>
        <Grid item xs={12}>
          <UserOrderTable />
        </Grid>
      </Grid>
    </Container>
  )
}
