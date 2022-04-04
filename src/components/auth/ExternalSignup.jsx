import React from 'react'
import { Link } from 'react-router-dom'
import SVG from 'react-inlinesvg'

import { googleIcon, facebookIcon, appleIcon } from './AuthIcons'

const ExternalSignup = ({ changeView, animate }) => (
  <div className={animate ? 'animated auth-form' : 'auth-form'}>
    <div className="form-container">
      <h2>Log in into pynt</h2>
      <p>sign in quickly using</p>
      {/* <button type="button" className="google btn-outline" disabled>
      {googleIcon}
      <span>Sign up with Google</span>
    </button-->
    <button type="button" onClick={demoLogin} className="demo btn-outline">
      {facebookIcon}
      <i>
        <FiUserCheck />
      </i>
      <span>Log in as Demo User</span>
    </button>*/}
      <div className="auth-login-buttons">
        <button className="btn-secondary">
          <SVG src={googleIcon} className="login-icon" /> Google
        </button>
        <button className="btn-secondary">
          <SVG src={facebookIcon} className="login-icon" />
          Facebook
        </button>
        <button className="btn-secondary">
          <SVG src={appleIcon} className="login-icon" /> Apple
        </button>
      </div>
      <p className="auth-or">or</p>
      <Link to="/login" style={{ textDecoration: 'none' }}>
        <button
          type="button"
          style={{ margin: 'auto', width: '100%', marginTop: '10px', textDecoration: 'none' }}
          className="btn-blue"
          onClick={changeView}
        >
          Log in
        </button>
      </Link>
      <p className="auth-text">
        Don’t have an account?{' '}
        <a className="auth-text-red" onClick={changeView}>
          Sign up for free!
        </a>
        <br />
        <Link className="auth-text-blue" to="/signup">
          Forgot your password?
        </Link>
      </p>
      {/* <small>
          Don&apos;t want to sign up?&nbsp;
          <a href="#">Log in as demo user</a>
        </small> */}
    </div>
  </div>
)

export default ExternalSignup
