import React, { useEffect, useState, useCallback } from 'react'

import { Avatar, Button, FormGroup, FormControlLabel, Typography, TextField } from '@material-ui/core'

import noAvatar from '../../assets/png/placeholders/64x64.png'
import styles from './Settings.module.css'

function EditProfile({ user, userProfile, onEditUser, onUploadAvatar }) {
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    username: '',
    businessType: '',
    avatar: ''
  })

  useEffect(() => {
    setUserDetails({
      firstName: userProfile?.firstName ? userProfile.firstName : user.firstName,
      lastName: userProfile?.lastName ? userProfile.lastName : user.lastName || '',
      username: userProfile?.userName ? userProfile.Name : user.Name || '',
      businessType: '',
      avatar: userProfile?.avatar ? userProfile.avatar : user.avatar
    })
  }, [user, userProfile])

  const onSave = useCallback(() => {
    onEditUser(userDetails)
  }, [userDetails])

  const handleAvatarChanged = useCallback(
    e => {
      const file = e.target.files[0]
      const form = new FormData()
      const newFile = new Blob([file], { type: file.type })

      form.append('file', newFile, newFile.filename)
      form.append('type', 'crm/client/avatar')
      form.append('name', file.name)

      onUploadAvatar(user?.id || userProfile?.id, form)
    },
    [onUploadAvatar, user, userProfile]
  )

  const handleInputChanged = e => {
    const name = e.target.name
    const value = e.target.value
    setUserDetails(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const { firstName, lastName, username, businessType, avatar } = userDetails

  return (
    <div className="Settingstemplate">
      {/* header section */}
      <Typography className={styles.pageHeading}>Edit profile</Typography>
      <Typography className={styles.pageSubheading}>
        People visiting and following you profile will see the info below
      </Typography>

      {/* avatar section */}
      <Typography className="smallUserTitle">Photo</Typography>
      <div className={styles.avatarManipulations}>
        <Avatar src={avatar ? `${process.env.REACT_APP_MEDIA_URL}/${avatar}` : noAvatar} className="userImage" />
        <FormControlLabel
          control={
            <input
              id="upload-avatar"
              className={styles.hidden}
              type="file"
              accept="image/*"
              onChange={handleAvatarChanged}
            />
          }
          label="Change"
          className={styles.changeButton}
        />
        <Button variant="contained" className="backBtn r-full">
          Back to Profile
        </Button>
      </div>

      {/* user details section */}
      <form className="Settingstemplate__form">
        <div className="formRow">
          <FormGroup>
            <FormControlLabel
              control={<TextField name="firstName" value={firstName} onChange={handleInputChanged} fullWidth />}
              label="First Name"
              labelPlacement="top"
              className="Settingstemplate__Block"
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={<TextField name="lastName" value={lastName} onChange={handleInputChanged} fullWidth />}
              label="Last Name"
              labelPlacement="top"
              className="Settingstemplate__Block"
            />
          </FormGroup>
        </div>
        <FormGroup>
          <FormControlLabel
            control={<TextField name="username" value={username} onChange={handleInputChanged} fullWidth />}
            label="Username"
            labelPlacement="top"
            className="Settingstemplate__Block"
          />
        </FormGroup>
        <FormGroup>
          <FormControlLabel
            control={<TextField name="businessType" value={businessType} onChange={handleInputChanged} fullWidth />}
            label="Business Type"
            labelPlacement="top"
            className="Settingstemplate__Block"
          />
        </FormGroup>

        <Button variant="contained" onClick={onSave} className="blueBtn">
          Save
        </Button>
      </form>
    </div>
  )
}

export default EditProfile
