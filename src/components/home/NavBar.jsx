import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SVG from 'react-inlinesvg'
import UserNav from '../auth/UserNav'
import styles from './NavBar.module.css'
import Logo from '../../assets/svg/pynt_logo.svg'

const NavBar = () => {
  const [menuOpened, setMenuOpened] = useState(false)

  return (
    <div className={menuOpened ? 'container-wide activeMobileMenu' : 'container-wide'}>
      <div className={styles.navBar} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/">
          <div className={styles.logo}>
            <SVG src={Logo} alt="logo" />
          </div>
        </Link>
        <div className="menuBlock">
          <ul className={styles.nav}>
            <li>
              <Link to="/user/explore"> Explore</Link>
            </li>
            <li>Features</li>
            <li>
              <Link to="/pricing">Pricing</Link>
            </li>
          </ul>
        </div>
        <div className="menuIcons">
          <UserNav style={{ marginLeft: '0' }} />
          <button className="mobileMenuToggle d-lg-none" onClick={() => setMenuOpened(!menuOpened)}>
            <span></span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NavBar
