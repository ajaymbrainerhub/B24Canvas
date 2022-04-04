import axios from 'axios'

import { updateMode } from './mode_actions'

axios.defaults.withCredentials = true

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
export const RECEIVE_USER = 'RECEIVE_USER'
export const RECEIVE_USER_AVATAR = 'RECEIVE_USER_AVATAR'
export const RECEIVE_USER_BACKGROUND = 'RECEIVE_USER_BACKGROUND'
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER'
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_ERRORS'
export const CLEAR_ERRORS = 'CLEAR_ERRORS'

const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  user: currentUser
})

const receiveUser = user => ({
  type: RECEIVE_USER,
  user: user
})

const receiveUserAvatar = (userId, avatar) => ({
  type: RECEIVE_USER_AVATAR,
  avatar,
  userId
})

const receiveUserBackground = (userId, background) => ({
  type: RECEIVE_USER_BACKGROUND,
  background,
  userId
})

const logoutCurrentUser = () => ({
  type: LOGOUT_CURRENT_USER
})

export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
})

export const clearErrors = () => ({
  type: CLEAR_ERRORS
})

export const getUser = () => dispatch =>
  axios
    .get(process.env.REACT_APP_API_URL + '/client/' + process.env.REACT_APP_BOT_ID, {
      withCredentials: true
    })
    .then(
      res => dispatch(receiveCurrentUser(res.data.result)),
      res => dispatch(receiveErrors(res.responseJSON))
    )

export const getUserById = id => dispatch =>
  axios
    .get(`${process.env.REACT_APP_API_URL}/customer/${process.env.REACT_APP_BOT_ID}/${id}`, {
      withCredentials: true
    })
    .then(
      res => {
        console.log(`USERFOUND: ${JSON.stringify(res.data.result)}`)
        dispatch(receiveUser(res.data.result))
      },
      res => {
        console.log(`ERRRRRRRRR ${id}`)

        dispatch(receiveErrors(res.responseJSON))
      }
    )
export const getUsers = () => dispatch =>
  axios
    .get(process.env.REACT_APP_API_URL + '/client/' + process.env.REACT_APP_BOT_ID, {
      withCredentials: true
    })
    .then(
      res => {
        console.log(`CLIENTTTTTS: ${JSON.stringify(res.data.result)}`)

        dispatch(receiveCurrentUser(res.data.result))
      },
      res => dispatch(receiveErrors(res.responseJSON))
    )

export const uploadAvatar = (userId, data) => dispatch => {
  axios
    .post(`${process.env.REACT_APP_API_URL}/upload`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    })
    .then(
      res => dispatch(receiveUserAvatar(userId, res.data.result)),
      res => dispatch(receiveErrors(res.responseJSON))
    )
}

export const uploadBackground = (userId, data) => dispatch => {
  axios
    .post(`${process.env.REACT_APP_API_URL}/upload`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    })
    .then(
      res => dispatch(receiveUserBackground(userId, res.data.result)),
      res => dispatch(receiveErrors(res.responseJSON))
    )
}

export const updateUser = data => dispatch => {
  axios
    .put(process.env.REACT_APP_API_URL + '/client/' + process.env.REACT_APP_BOT_ID, data, {
      withCredentials: true
    })
    .then(
      res => dispatch(receiveCurrentUser(res.data.result)),
      res => dispatch(receiveErrors(res.responseJSON))
    )
}

export const signup = user => dispatch =>
  axios
    .post(process.env.REACT_APP_API_URL + '/register/' + process.env.REACT_APP_BOT_ID, user, {
      withCredentials: true
    })
    .then(
      res => dispatch(receiveCurrentUser(res.data.result)),
      res => dispatch(receiveErrors(res.responseJSON))
    )

export const login = user => dispatch =>
  axios
    .post(process.env.REACT_APP_API_URL + '/client/' + process.env.REACT_APP_BOT_ID, user, {
      withCredentials: true
    })
    .then(
      res => {
        if (res.data.success) {
          dispatch(receiveCurrentUser(res.data.result))
          dispatch(updateMode('browse'))
        } else {
          dispatch(receiveErrors(res.data.message))
        }
      },
      res => dispatch(receiveErrors(res.responseJSON))
    )

export const logout = user => dispatch =>
  axios
    .delete(process.env.REACT_APP_API_URL + '/client/' + process.env.REACT_APP_BOT_ID, user, {
      withCredentials: true
    })
    .then(() => {
      dispatch(logoutCurrentUser())
      dispatch(updateMode('splash'))
    })
