import React, { useEffect, useState, useCallback } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab, Box } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import Navbar from '../components/Navbar'
import { updateUser, uploadAvatar, uploadBackground } from '../../../actions/session_actions'

import noAvatar from '../../../assets/png/placeholders/64x64.png'
import styles from './Settings.module.css'

function Settings(props) {
  const { onEditUser, onUploadAvatar, onUploadBackground } = props

  const [userProfile, setUserProfile] = useState(null)
  const [activeTab, setActiveTab] = useState(0)

  function generatePage(props) {
    switch (activeTab) {
      case 0:
        return <MainPage {...props} />
    }
  }

  useEffect(() => {
    setUser()
    console.log('trigger')
  }, [props.user])

  const setUser = () => {
    const { user } = props
    setUserProfile(user)
  }

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <Box display="flex" flexDirection="row" alignItems="center" mb={4}>
          <h1 style={{ marginRight: '4rem' }}>Settings</h1>
          <Tabs
            value={activeTab}
            indicatorColor="primary"
            textColor="primary"
            onChange={(e, newValue) => this.setState({ activeTab: newValue })}
            variant="fullWidth"
          >
            <StyledTab label="Edit Profile" />
            {/*<StyledTab label="Account Settings" />*/}
            {/*<StyledTab label="Login and Password" />*/}
          </Tabs>
        </Box>
        {generatePage({ user: userProfile, userProfile, onEditUser, onUploadAvatar, onUploadBackground })}
      </div>
    </>
  )
}

function MainPage(props) {
  const { user, userProfile, onEditUser, onUploadAvatar, onUploadBackground } = props
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [avatar, setAvatar] = useState('')
  const [background, setBackground] = useState('')

  useEffect(() => {
    setFirstName(userProfile?.firstName ? userProfile.firstName : user.firstName)
    setLastName(userProfile?.lastName ? userProfile.lastName : user.lastName)
    setAvatar(userProfile?.avatar ? userProfile.avatar : user.avatar)
    setBackground(userProfile?.background ? userProfile.background : user.background)
  }, [user, userProfile])

  const onSave = useCallback(() => {
    onEditUser({ firstName, lastName, avatar, background })
  }, [firstName, lastName, avatar, background])

  const onChangeAvatar = useCallback(
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

  const onChangeBackground = useCallback(
    e => {
      const file = e.target.files[0]
      const form = new FormData()
      const newFile = new Blob([file], { type: file.type })

      form.append('file', newFile, newFile.filename)
      form.append('type', 'crm/client/background')
      form.append('name', file.name)

      onUploadBackground(user?.id || userProfile?.id, form)
    },
    [onUploadBackground, user, userProfile]
  )

  return (
    <>
      <h2>Edit profile</h2>
      <span>People visiting and following you profile will see the info below</span>
      <div className={styles.filesBlock}>
        <div className={styles.avatarBlock}>
          <span>Photo</span>
          <div className={styles.avatarManipulations}>
            <div className={styles.avatarContainer}>
              <img src={avatar ? `${process.env.REACT_APP_MEDIA_URL}/${avatar}` : noAvatar} alt="Your current avatar" />
            </div>
            <label htmlFor="upload-avatar">
              <div role="button" className={styles.changeButton}>
                Change
              </div>
              <input
                id="upload-avatar"
                className={styles.hidden}
                type="file"
                accept="image/*"
                onChange={onChangeAvatar}
              />
            </label>
          </div>
        </div>
        <div className={styles.avatarBlock}>
          <span>Background</span>
          <div className={styles.avatarManipulations}>
            <div className={styles.backgroundContainer}>
              <img
                src={
                  background
                    ? `${process.env.REACT_APP_MEDIA_URL}/${background}`
                    : 'https://wallup.net/wp-content/uploads/2019/09/813312-autumn-fall-landscape-nature-tree-forest.jpg'
                }
                alt={''}
              />
            </div>
            <label htmlFor="upload-background">
              <div role="button" className={styles.changeButton}>
                Change
              </div>
              <input
                id="upload-background"
                className={styles.hidden}
                type="file"
                accept="image/*"
                onChange={onChangeBackground}
              ></input>
            </label>
          </div>
        </div>
      </div>
      <div className={styles.nameContainer} style={{ marginTop: '3rem' }}>
        <div className={styles.input}>
          <label htmlFor="firstName">First name</label>
          <input name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} />
        </div>
        <div className={styles.input}>
          <label htmlFor="lastName">Last name</label>
          <input name="lastName" value={lastName} onChange={e => setLastName(e.target.value)} />
        </div>
      </div>
      <div className={styles.input}>
        <label htmlFor="email">E-mail</label>
        <input
          name="email"
          disabled={true}
          value={userProfile?.email ? userProfile.email : user.email}
          // onChange={() => this.updateUserProfile}
        />
      </div>
      {/*<div className={styles.input}>*/}
      {/*  <label for="businessType">Business Type</label>*/}
      {/*  <input name="businessType" value={state.businessType} />*/}
      {/*</div>*/}
      <button role="button" className={styles.mainButton} style={{ marginTop: '3rem' }} onClick={onSave}>
        Save
      </button>
    </>
  )
}

const StyledTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    color: '#fff',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(10),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1
    },
    '& > span': {
      fontSize: '16px'
    }
  }
}))(props => <Tab disableRipple {...props} />)

export default connect(
  state => {
    return {
      user: state.entities.users[state.session.id]
    }
  },
  dispatch => ({
    onEditUser: data => dispatch(updateUser(data)),
    onUploadAvatar: (userId, data) => dispatch(uploadAvatar(userId, data)),
    onUploadBackground: (userId, data) => dispatch(uploadBackground(userId, data))
  })
)(Settings)
