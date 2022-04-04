import React, { useState, useEffect } from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import SVG from 'react-inlinesvg'
import { Chip, Collapse, Fade } from '@mui/material'

import CreateCustomTemplate from '../../modal/CreateCustomTemplate'
import MyDesigns from './MyDesigns'
import Templates from './Templates'
import Trash from './Trash'
import Uploads from './Uploads'
import Navbar from '../components/Navbar'
import { SearchIcon, Settings2Icon } from '../../../assets/svg'
import { Home, Plus } from '../View/svg'

export default class BrowseIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      showModal: false,
      searchPanel: false
    }
  }

  render() {
    const { location } = this.props
    const { searchPanel, search } = this.state
    return (
      <div className={'browse'}>
        <Navbar toggleSearch={() => this.setState({ searchPanel: !searchPanel })} />
        <Collapse in={location.pathname !== '/folder/trash' && location.pathname !== '/folder/uploads' && searchPanel}>
          <header>
            <div className="left">
              <Link to={'/'}>
                <SVG src={Home} />
              </Link>
            </div>
            <div className="right">
              <Fade in={location.pathname !== '/folder/trash' && location.pathname !== '/folder/uploads'}>
                <button role={'button'} onClick={() => this.setState({ searchPanel: !searchPanel })}>
                  <SVG src={SearchIcon} className="searchIcon" />
                </button>
              </Fade>
              <Link to="/settings">
                <button role={'button'}>
                  <SVG src={Settings2Icon} className="searchIcon" />
                </button>
              </Link>
            </div>
          </header>
          <div className={'searchBar'}>
            <h1>Create Any Design</h1>
            <div className={'searchField'}>
              <input
                value={this.state.search}
                onChange={e => this.setState({ search: e.target.value })}
                placeholder="search any design"
              />
              <SVG src={SearchIcon} />
            </div>
            <div className={'tags'}>
              {tags.map((item, key) => (
                <span onClick={() => this.setState({ search: item })} key={key} className={'tag'}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Collapse>
        <FolderTabs folders={folders} location={location.pathname} />
        <Switch>
          <Route
            path="/"
            exact
            render={props => (
              <Templates {...props} searchKey={search} showModal={() => this.setState({ showModal: true })} />
            )}
          />
          <Route
            path="/folder/all-designs"
            render={props => (
              <MyDesigns {...props} searchKey={search} showModal={() => this.setState({ showModal: true })} />
            )}
          />
          <Route path="/folder/trash" component={Trash} />
          <Route path="/folder/uploads" component={Uploads} />
        </Switch>
        {this.state.showModal && <CreateCustomTemplate closeModal={() => this.setState({ showModal: false })} />}
        <button role="button" className={'addButton'} onClick={() => this.setState({ showModal: true })}>
          <SVG src={Plus} /> Create
        </button>
      </div>
    )
  }
}

function FolderTabs(props) {
  const { folders, location } = props

  return (
    <div className={'folderTabs'}>
      {folders.map((item, index) => (
        <Link to={item.link} key={index}>
          <Chip
            sx={{
              fontSize: '.75em'
            }}
            clickable
            label={item.name}
            variant={location === item.link ? 'contained' : 'outlined'}
          />
        </Link>
      ))}
    </div>
  )
}

const folders = [
  { name: 'Public Template', link: '/' },
  { name: 'My Designs', link: '/folder/all-designs' },
  { name: 'Trash', link: '/folder/trash' },
  { name: 'Uploads', link: '/folder/uploads' }
]

const tags = ['sports', 'business', 'hamburger', 'hamburger', 'hamburger', 'food']
