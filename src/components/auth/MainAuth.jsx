import React from 'react'
import { Switch } from 'react-router-dom'

import { AuthRoute } from '../../util/route_util'
import SignupAuthFormContainer from './SignupAuthFormContainer'
import LoginAuthFormContainer from './LoginAuthFormContainer'
import Home from '../home'

import styles from './MainAuth.module.css'

const MainAuth = () => (
  <div className={styles.main}>
    <Switch>
      <AuthRoute path="/login" component={LoginAuthFormContainer} />
      <AuthRoute path="/signup" component={SignupAuthFormContainer} />
      <AuthRoute path="/" component={Home} />
    </Switch>
    <div className={styles.splash} />
  </div>
)

export default MainAuth
