import React from 'react'
import { Link, Route, Switch, withRouter } from 'react-router-dom'
import SVG from 'react-inlinesvg'
import AllFoldersContainer from './folder/AllFolders'
import DeletedDesigns from './DeletedDesigns'
import UploadsContainer from './image/uploads_container'
import PublicDesignsContainer from '../home/Home'
import Settings from '../settings/Settings'
import Brands from './brands'
import Calendar from '../event_calendar/Calendar'
import Explore from '../explore/Explore'
import styles from './BrowseIndex.module.css'

import {
  HomeIcon,
  DirIcon,
  BrandsStar,
  FavIcon,
  TimeLeftIcon,
  TrashIcon,
  //TrashBinIcon,
  UploadIcon,
  Settings2Icon
} from '../../assets/svg/'

import DesignsBrowser from './design_browser/DesignsBrowser'
import CustomFolderBrowser from './design_browser/CustomFolderBrowser'
import Uploads from './Uploads'

class BrowseIndex extends React.Component {
  componentDidMount() {
    const { requestFolders, currentUser } = this.props
    requestFolders(currentUser.email)
  }

  render() {
    const { location, folders } = this.props
    return (
      <div className={styles.container}>
        {location.pathname !== '/user/explore' ? (
          <div className={styles.sideBar}>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <Link to="/">
                  <button type="button" className={`${location.pathname === '/' ? 'active-route' : ''} btn-index`}>
                    <div className="sideIcon">
                      <SVG src={HomeIcon} />
                    </div>
                    <span>Home</span>
                  </button>
                </Link>
              </li>
              <li className={styles.listItem}>
                <Link to="/user/designs">
                  <button
                    type="button"
                    className={`${location.pathname === '/user/designs' ? 'active-route' : ''} btn-index`}
                  >
                    <div className="sideIcon">
                      <SVG src={DirIcon} />
                    </div>
                    <span>Designs</span>
                  </button>
                </Link>
              </li>
              <li className={styles.listItem}>
                <Link to="/user/brand-kit">
                  <button
                    type="button"
                    className={`${location.pathname === '/user/brand-kit' ? 'active-route' : ''} btn-index`}
                  >
                    <div className="sideIcon">
                      <SVG src={BrandsStar} />
                    </div>
                    <span>Brands</span>
                  </button>
                </Link>
              </li>
              <li className={styles.listItem}>
                <Link to="/user/uploads">
                  <button
                    type="button"
                    className={`${location.pathname === '/user/uploads' ? 'active-route' : ''} btn-index`}
                  >
                    <div className="sideIcon">
                      <SVG src={UploadIcon} />
                    </div>
                    <span>Uploads</span>
                  </button>
                </Link>
              </li>
              <li className={styles.listItem}>
                <Link to="/user/trash">
                  <button type="button" className={`${location.pathname === '/trash' ? 'active-route' : ''} btn-index`}>
                    <div className="sideIcon">
                      <SVG src={TrashIcon} />
                    </div>
                    <span>Trash</span>
                  </button>
                </Link>
              </li>
            </ul>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <Link to="/user/settings">
                  <button
                    type="button"
                    className={`${location.pathname === '/settings' ? 'active-route' : ''} btn-index`}
                  >
                    <div className="sideIcon">
                      <SVG src={Settings2Icon} />
                    </div>
                  </button>
                </Link>
              </li>
            </ul>
          </div>
        ) : null}
        <div className={styles.main}>
          <Switch>
            <Route exact path="/" component={PublicDesignsContainer} />
            <Route path="/user/settings" component={Settings} />
            <Route path="/user/calendar" component={Calendar} />
            <Route path="/user/explore" component={Explore} />
            <Route path="/user/designs" component={DesignsBrowser} />
            <Route path="/user/brand-kit" component={Brands} />
            <Route path="/user/trash" component={DeletedDesigns} />
            <Route path="/user/uploads" component={Uploads} />
            <Route path="/user/folder/:folderId" component={CustomFolderBrowser} />
            <Route path="/user" component={AllFoldersContainer} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default withRouter(BrowseIndex)
