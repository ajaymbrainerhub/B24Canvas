import React from 'react'

import Root from './components/Root'
import configureStore from './store/store'
// import * as designActions from './actions/design_actions';
// import { signup, login, logout } from './actions/session_actions';

import styles from './assets/styles/index.scss'

export default function CanvasEditor(props) {
  // const store = configureStore();

  let store
  store = configureStore({
    entities: {
      users: { [props.user.id]: props.user }
    },
    session: { id: props.user.id },
    ui: { mode: 'browse' }
  })

  // window.getState = store.getState;
  // window.dispatch = store.dispatch;
  // window.signup = signup;
  // window.login = login;
  // window.logout = logout;
  // window.requestTemplates = designActions.requestTemplates;
  // window.requestDesign = designActions.requestDesign;
  // window.createDesign = designActions.createDesign;
  // window.updateDesign = designActions.updateDesign;
  // window.deleteDesign = designActions.deleteDesign;

  return <Root className={styles.root} store={store} />
}
