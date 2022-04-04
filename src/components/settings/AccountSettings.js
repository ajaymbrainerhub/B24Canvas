import React, { Fragment } from 'react'

import { Grid, Typography, Button, FormGroup, FormControlLabel, Switch, Paper } from '@material-ui/core'
import { Edit } from '@material-ui/icons'

import styles from './Settings.module.css'
import './settings.scss'

import SubsPlanInfoItem from './SubsPlanInfoItem'

const subsPlanInfo = [
  {
    name: 'Plan',
    value: 'Pro Plan'
  },
  {
    name: 'Date',
    value: '27/09/2021'
  },
  {
    name: 'Untill',
    value: '27/09/2022'
  },
  {
    name: 'Renew',
    value: 'Yearly'
  }
]

function AccountSettings() {
  return (
    <div className="Settingstemplate">
      {/* header section */}
      <Typography className={styles.pageHeading}>Account Settings</Typography>
      <Typography className={styles.pageSubheading}>
        People visiting and following you profile will see the info below
      </Typography>

      {/* subscription section */}
      <Typography className="SettingstemplateSubTitle">Subscription Plan</Typography>
      <Paper elevation={1} className="bluecard">
        <Grid container justifyContent="space-between" alignItems="center">
          {subsPlanInfo.map(({ name, value }) => (
            <Fragment key={name}>
              <SubsPlanInfoItem name={name} value={value} />
            </Fragment>
          ))}
          <Button variant="outlined" className="whiteBtn">
            Change Plan
          </Button>
        </Grid>
        <FormGroup className="Settingstemplatetoggle">
          <FormControlLabel control={<Switch defaultChecked />} label="Account Renewal" />
        </FormGroup>
      </Paper>
      <Typography className="cardTitle">Credit Card</Typography>
      <Paper elevation={1} className="graycard">
        <Grid container justifyContent="space-between">
          <Grid item className="smallTitle">
            <Typography>**** **** **** 55622</Typography>
          </Grid>
          <Grid item className="smallTitle">
            <Typography>08/2027</Typography>
          </Grid>
          <Grid item className="smallTitle">
            <Typography>Master Card</Typography>
          </Grid>
          <Grid item className="editbtn">
            <Edit />
          </Grid>
        </Grid>
      </Paper>

      {/* language section */}
      <Typography className="SettingstemplateSubTitle">Language</Typography>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography className="SettingstemplatesmallTitle">Select your preferred language</Typography>
        </Grid>
        <Grid item>
          <Button variant="outlined" className="grayBtn">
            English
          </Button>
        </Grid>
      </Grid>

      <Button variant="contained" className="blueBtn">
        Save
      </Button>
    </div>
  )
}

export default AccountSettings
