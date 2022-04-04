import React from 'react'
import { Redirect } from 'react-router-dom'
import { AuthRoute, ProtectedRoute } from '../util/route_util'
import NavBar from './home/NavBar'
import NavBarSearch from './NavBar'
import SignupAuthFormContainer from './auth/SignupAuthFormContainer'
import LoginAuthFormContainer from './auth/LoginAuthFormContainer'
import MainAuth from './auth/MainAuth'
import BrowseIndexContainer from './browse/browse_index_container'
import styles from './Browse.module.css'
import ImageShow from './modal/ImageShow'
import UploadedImageModalContainer from './modal/uploaded_image_modal_container'

const Browse = ({ mode, sessionId, toggleModal, uploadedModal }) => {
  const isFolder = window.location.href.indexOf('/user/') !== -1
  return (
    <>
      <div className={uploadedModal ? `${styles.container} ${styles.blurred}` : styles.container}>
        {!sessionId ? (
          <div className={styles['container-wide']}>
            <AuthRoute path="/" component={MainAuth} />
          </div>
        ) : (
          <>
            <Redirect to="/" />
            {isFolder ? <NavBarSearch mode={mode} /> : <NavBar mode={mode} />}
            <ProtectedRoute path="/" component={BrowseIndexContainer} />
          </>
        )}
      </div>
      <UploadedImageModalContainer active={uploadedModal} toggleModal={id => toggleModal('uploadedModal', id)} />
    </>
  )
}

export default Browse
