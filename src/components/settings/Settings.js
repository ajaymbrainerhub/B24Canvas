import React from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab, Box } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

import NavBar from '../home/NavBar'
import EditProfile from './EditProfile'
import AccountSettings from './AccountSettings'
import { updateUser, uploadAvatar, uploadBackground } from '../../actions/session_actions'

import styles from './Settings.module.css'
import LoginAndPass from './LoginAndPass'
import Notification from './Notification'
import PurchasedTemplates from '../purchased_templates/PurchasedTemplates'

class Settings extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userProfile: null,
      activeTab: 0
    }
  }

  componentDidMount() {
    this.setUser()
  }

  setUser() {
    const { user } = this.props
    this.setState({ userProfile: user })
  }

  updateUserProfile(e) {
    this.setState({ ...state, [e.target.name]: e.target.value })
  }

  render() {
    const { user, onEditUser, onUploadAvatar, onUploadBackground } = this.props
    const { userProfile, activeTab } = this.state

    function generatePage(props) {
      switch (activeTab) {
        case 0:
          return <EditProfile {...props} />
        case 1:
          return <AccountSettings />
        case 2:
          return <LoginAndPass />
        case 3:
          return <Notification />
        case 4:
          return <PurchasedTemplates />
      }
    }

    return (
      <>
        <div className={styles.container}>
          <Box mb={4} className={styles.settingsHeader}>
            <h1 style={{ marginRight: '4rem' }} className={styles.settingsHeader__title}>
              Settings
            </h1>
            <div display="flex" flexDirection="row" alignItems="center">
              <Tabs
                value={activeTab}
                indicatorColor="primary"
                textColor="primary"
                onChange={(e, newValue) => this.setState({ activeTab: newValue })}
                variant="fullWidth"
                className={styles.settingsHeader__tabs}
              >
                <StyledTab label="Edit Profile" />
                <StyledTab label="Account Settings" />
                <StyledTab label="Login and Password" />
                <StyledTab label="Notification and Email" />
                <StyledTab label="Purchase History" />
              </Tabs>
            </div>
          </Box>
          {generatePage({ user, userProfile, onEditUser, onUploadAvatar, onUploadBackground })}
        </div>
      </>
    )
  }
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
  state => ({
    user: state.entities.users[state.session.id]
  }),
  dispatch => ({
    onEditUser: data => dispatch(updateUser(data)),
    onUploadAvatar: (userId, data) => dispatch(uploadAvatar(userId, data)),
    onUploadBackground: (userId, data) => dispatch(uploadBackground(userId, data))
  })
)(Settings)
