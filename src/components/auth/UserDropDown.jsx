/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import noAvatar from '../../assets/png/placeholders/64x64.png'
import styles from './UserDropDown.module.css'

const UserDropDown = ({ currentUser, logout }) => {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
  }, [])

  const handleLogout = () => {
    setAnimate(false)
    // setTimeout(logout, 2000);
  }

  return (
    <div className={`${styles.dropdownCard} ${animate ? styles.animate : ''}`}>
      <ul>
        <li className={styles.profile}>
          <div className={styles.profileImg}>
            <img
              alt="profile img"
              src={currentUser?.avatar ? `${process.env.REACT_APP_MEDIA_URL}/${currentUser?.avatar}` : noAvatar}
            />
          </div>
          <div className={styles.profileText}>
            <p>{currentUser.username}</p>
            <small>{currentUser.email}</small>
          </div>
        </li>
        <li>
          <hr className={styles.hr} />
        </li>
        <Link to="/user/profile">
          <li className={`${styles.listItem}`}>Account</li>
        </Link>
        <Link to="/user/settings">
          <li className={`${styles.listItem}`}>Settings</li>
        </Link>
        <Link to="/dashboard">
          <li className={`${styles.listItem}`}>Dashboard</li>
        </Link>
        {/*<li className={`${styles.listItem} ${styles.disabled}`}>Refer friends</li>*/}
        {/*<li className={`${styles.listItem} ${styles.disabled}`}>Get Help</li>*/}
        <li className={styles.listItem} onClick={logout}>
          Sign out
        </li>
      </ul>
    </div>
  )
}

export default UserDropDown
