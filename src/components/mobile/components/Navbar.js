import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SVG from 'react-inlinesvg'
import { Fade, Menu, MenuItem } from '@mui/material'

import { SearchIcon, Settings2Icon } from '../../../assets/svg'

import { Home, Ellipsis } from '../View/svg'

import styles from '../styles.scss'
import { keys } from 'regenerator-runtime'

function Navbar(props) {
  const { toggleSearch } = props
  const [anchor, setAnchor] = useState(null)

  const handleOpen = event => {
    setAnchor(event.currentTarget)
  }

  const handleClose = () => {
    setAnchor(null)
  }

  return (
    <header className={'mobileNavbar'}>
      <div className="left">
        <Link to={'/'}>
          <SVG src={Home} />
        </Link>
      </div>
      <div className="right">
        <button role={'button'} onClick={handleOpen}>
          <SVG src={Ellipsis} />
        </button>
        {toggleSearch && (
          <Fade in={location.pathname !== '/folder/trash' && location.pathname !== '/folder/uploads'}>
            <button role={'button'} onClick={toggleSearch}>
              <SVG src={SearchIcon} className="searchIcon" />
            </button>
          </Fade>
        )}
        <Link to="/settings">
          <button role={'button'}>
            <SVG src={Settings2Icon} className="searchIcon" />
          </button>
        </Link>
      </div>
      <Menu
        id="additionalMenu"
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button'
        }}
      >
        {menuItems.map((item, key) => (
          <StyledMenuItem key={key} handleClick={handleClose} label={item.label} link={item.link} />
        ))}
      </Menu>
    </header>
  )
}

function StyledMenuItem({ handleClick, label, link }) {
  return (
    <Link to={link}>
      <MenuItem sx={{ fontSize: '14px' }} onClick={handleClick}>
        {label}
      </MenuItem>
    </Link>
  )
}

const menuItems = [
  { label: 'Explore', link: '/link' },
  { label: 'Features', link: '/features' },
  { label: 'Pricing', link: '/pricing' }
]

export default Navbar
