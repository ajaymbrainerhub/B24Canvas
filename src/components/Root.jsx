import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import AppContainer from './app_container'
import { getUser } from '../actions/session_actions'

const Root = ({ store, onGetUser }) => {
  useEffect(() => {
    onGetUser()
  }, [])

  return (
    <Provider store={store}>
      <HashRouter>
        <AppContainer />
      </HashRouter>
    </Provider>
  )
}

const mapDispatchToProps = dispatch => ({
  onGetUser: () => dispatch(getUser())
})

export default connect(null, mapDispatchToProps)(Root)
