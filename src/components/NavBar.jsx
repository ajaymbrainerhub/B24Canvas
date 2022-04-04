import React from 'react'
import { Link } from 'react-router-dom'
import SVG from 'react-inlinesvg'
import { Button, Typography } from '@material-ui/core'
import { Notifications, Home } from '@material-ui/icons'

import UserNav from './auth/UserNav'
import { useState, useEffect } from 'react'
import styles from './NavBar.module.css'
import Logo from '../assets/svg/pynt_logo.svg'
import { SearchIcon } from '../assets/svg'
import CreateCustomTemplate from './modal/CreateCustomTemplate'
import { connect } from 'react-redux'
import { updateSearch } from '../actions/search_bar_actions'

const NavBar = ({ mode, updateSearch }) => {
  const [toggleShowModal, setToggleShowModal] = useState({ showModal: false })
  const [search, setSearch] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const handleChange = event => {
    console.log(`'Change ${event.target.value}`)
    setSearch(event.target.value)
  }
  const handleSubmit = event => {
    event.preventDefault()
    updateSearch(search)
    console.log(`'Sumbit ${search}`)
  }
  return (
    <div className={mode === 'splash' ? 'container' : 'container-wide border-bottom'}>
      <div className={styles.navBar}>
        <Link to="/">
          <div className={styles.logo}>
            <SVG src={Logo} alt="logo" />
          </div>
        </Link>
        <Link to="/">
          <Button className={styles.homeBtn}>
            <Home />
            <Typography>Home</Typography>
          </Button>
        </Link>
        <ul className={styles.nav}>
          {/* <li>Home</li>
        <li>Templates</li>
        <li>Discover</li>
        <li>Learn</li>
        <li>Pricing</li> */}
          <form onSubmit={handleSubmit}>
            <div className={styles.searchBar}>
              <SVG onClick={handleSubmit} src={SearchIcon} />
              <input name="searchbar" type="text" placeholder="Search. Any design." onChange={handleChange} />
            </div>
          </form>
        </ul>
        <Button className={styles.createDesignBtn} onClick={() => setToggleShowModal({ showModal: true })}>
          Create Design
        </Button>
        {toggleShowModal.showModal && (
          <CreateCustomTemplate closeModal={() => setToggleShowModal({ showModal: false })} />
        )}
        <Notifications className={styles.bellIcon} />
        <UserNav />
      </div>
    </div>
  )
}

export default connect(
  state => {
    return {
      search: state.ui.searchbar,
      currentUser: state.entities.users[state.session.id]
    }
  },
  dispatch => ({
    updateSearch: data => dispatch(updateSearch(data))
  })
)(NavBar)
