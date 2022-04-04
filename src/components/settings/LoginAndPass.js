import { FormControlLabel, FormGroup, TextField, Typography, Button } from '@material-ui/core'
import React, { useState } from 'react'

import styles from './Settings.module.css'
import './settings.scss'

function LoginAndPass() {
  const [state, setState] = useState({
    email: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleInputChanged = e => {
    const name = e.target.name
    const value = e.target.value
    setState(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <div className="Settingstemplate">
      {/* header section */}
      <Typography className={styles.pageHeading}>Login and Password</Typography>
      <Typography className={styles.pageSubheading}>
        People visiting and following you profile will see the info below
      </Typography>

      <form className="Settingstemplate__form">
        <FormGroup>
          <FormControlLabel
            control={<TextField name="email" value={state.email} onChange={handleInputChanged} fullWidth />}
            label="Account Email Address"
            labelPlacement="top"
            className="Settingstemplate__Block"
          />
          <Button className="verificationBtn">Send Verification</Button>
        </FormGroup>

        <FormGroup>
          <FormControlLabel
            control={<TextField name="newPassword" value={state.newPassword} onChange={handleInputChanged} fullWidth />}
            label="New Password"
            labelPlacement="top"
            className="Settingstemplate__Block"
          />
        </FormGroup>

        <FormGroup>
          <FormControlLabel
            control={
              <TextField name="confirmPassword" value={state.confirmPassword} onChange={handleInputChanged} fullWidth />
            }
            label="Confirm Password"
            labelPlacement="top"
            className="Settingstemplate__Block"
          />
        </FormGroup>

        <Button variant="contained" className="blueBtn">
          Save
        </Button>
      </form>
    </div>
  )
}

export default LoginAndPass
