import React from 'react'

import UserDropDown from './UserDropDown'

import noAvatar from '../../assets/png/placeholders/40x40.png'
import styles from './HaveUserNav.module.css'

class HaveUserNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = { dropDown: null }
  }

  toggleDropdown(card) {
    const { dropDown } = this.state
    if (dropDown === card) {
      this.setState({ dropDown: null })
    } else {
      this.setState({ dropDown: card })
    }
  }

  render() {
    const { currentUser, logout } = this.props
    const { dropDown } = this.state
    return (
      <>
        <div className={`${styles.containerRef} ml-16`}>
          <button type="button" className="btn-none" onClick={() => this.toggleDropdown('user')}>
            <img
              className={styles.profileImg}
              alt="profile img"
              src={currentUser?.avatar ? `${process.env.REACT_APP_MEDIA_URL}/${currentUser?.avatar}` : noAvatar}
            />
          </button>
          {dropDown === 'user' ? <UserDropDown currentUser={currentUser} logout={logout} /> : ''}
        </div>
      </>
    )
  }
}

export default HaveUserNav
