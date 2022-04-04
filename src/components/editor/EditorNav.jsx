import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { FiSave, FiRefreshCw, FiDownload, FiShare, FiShare2 } from 'react-icons/fi'

import { connect } from 'react-redux'

import SVG from 'react-inlinesvg'

import styles from './EditorNav.module.css'
import Logo from '../../assets/svg/pynt_logo.svg'
import PublishTemplateWindow from './PublishTemplate'

const EditorNav = ({
  updateDesign,
  createDesign,
  downloadDesign,
  loading,
  history,
  design,
  user,
  openShareDesignModal
}) => {
  const [publishTemplateDialogStatus, setPublishTemplateDialogStatus] = useState(false)
  const [menuOpened, setMenuOpened] = useState(false)

  return (
    <div className={menuOpened ? 'container-wide activeMobileMenu' : 'container-wide'}>
      <div className={styles.editorNav}>
        <nav className={styles.leftNav}>
          <Link to="/">
            <div className={styles.logo}>
              <SVG src={Logo} alt="logo" />
            </div>
          </Link>
          <div className="menuBlock">
            <div to="/" className={loading ? 'disabled' : ''}>
              <button
                type="button"
                className="btn-icon btn-editor blue"
                disabled={loading}
                onClick={() => history.goBack()}
              >
                New Design
              </button>
            </div>
            <div to="/" className={loading ? 'disabled' : ''}>
              <button type="button" className="btn-icon btn-editor" disabled={loading} onClick={() => history.goBack()}>
                My Design
              </button>
            </div>
            <div to="/" className={loading ? 'disabled' : ''}>
              <button
                type="button"
                className="btn-icon btn-editor purple"
                disabled={loading}
                onClick={() => setPublishTemplateDialogStatus(true)}
              >
                Publish Template
              </button>
            </div>
          </div>
          {/* <button type="button" className="btn-icon">
        File
      </button>
      <button type="button" className="btn-icon">
        Resize
      </button> */}
        </nav>
        <nav className={styles.rightNav}>
          <button type="button" className="btn-icon" onClick={openShareDesignModal}>
            <FiShare2 />
          </button>
          <button type="button" className="btn-icon btn-editor" onClick={downloadDesign}>
            <FiDownload />
            <span className="ml-4">Download</span>
          </button>

          <button type="button" className="btn-blue btn-nav" onClick={() => updateDesign()} disabled={loading}>
            {loading ? (
              <FiRefreshCw className="spin" />
            ) : (
              <>
                <FiSave />
                <span className="ml-4">Save</span>
              </>
            )}
          </button>
          <div className="menuIcons">
            <button className="mobileMenuToggle d-lg-none" onClick={() => setMenuOpened(!menuOpened)}>
              <span></span>
            </button>
          </div>
        </nav>

        <PublishTemplateWindow
          user={user}
          updateDesign={updateDesign}
          createDesign={createDesign}
          handleClose={() => setPublishTemplateDialogStatus(false)}
          isOpen={publishTemplateDialogStatus}
          design={design}
        />
      </div>
    </div>
  )
}

export default connect(state => ({
  user: state.entities.users[state.session.id]
}))(withRouter(EditorNav))
