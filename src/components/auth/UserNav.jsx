import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import HaveUserNav from './HaveUserNav'
import { logout } from '../../actions/session_actions'
import { createDesign } from '../../actions/design_actions'

import styles from './UserNav.module.css'

const UserNav = ({ currentUser, logout, style }) => {
  const noUser = (
    <>
      <Link to="/login">
        <button type="button" className="btn-width btn-outline">
          Log in
        </button>
      </Link>
      <Link to="/signup">
        <button type="button" className="btn-width btn-blue ml-16">
          Sign up
        </button>
      </Link>
    </>
  )

  return (
    <div className={styles.userNav} style={style ?? {}}>
      {console.log(`IDDDDD: ${currentUser?.id}`)}
      {currentUser ? <HaveUserNav currentUser={currentUser} logout={logout} /> : noUser}
    </div>
  )
}

export default connect(
  state => ({
    currentUser: state.entities.users[state.session.id]
  }),
  dispatch => ({
    logout: () => dispatch(logout()),
    createDesign: design => dispatch(createDesign(design))
  })
)(UserNav)
