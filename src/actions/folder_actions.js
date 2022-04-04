import connectorNodeV1 from '@sava.team/react-filemanager-connector-node-v1'
import { normalizeResource } from '@sava.team/react-filemanager-connector-node-v1/lib/utils/common'
import request from 'superagent'
import 'regenerator-runtime/runtime'

import { receiveErrors } from './session_actions'
import FolderAPIUtil from '../util/folder_api_util'
export const RECEIVE_FOLDER = 'RECEIVE_FOLDER'
export const RECEIVE_FOLDERS = 'RECEIVE_FOLDERS'
export const REMOVE_FOLDER = 'REMOVE_FOLDER'
export const SET_CURRENT_PATH = 'SET_CURRENT_PATH'

const apiOptions = {
  ...connectorNodeV1.apiOptions,
  apiRoot: `${process.env.REACT_APP_FILE_MANAGER_API_URL}/${process.env.REACT_APP_BOT_ID}`
}

const receiveFolder = payload => ({
  type: RECEIVE_FOLDER,
  payload
})

const receiveFolders = folders => ({
  type: RECEIVE_FOLDERS,
  payload: folders
})

const removeFolder = payload => ({
  type: REMOVE_FOLDER,
  payload
})

const getBaseResource = async options => {
  const route = `${options.apiRoot}/files/`
  const response = await request.get(route)
  return normalizeResource(response.body)
}

const firstInit = async (resource, user) => {
  const rootFolder = await connectorNodeV1.api.createFolder(apiOptions, resource.id, `${user}`)
  if (rootFolder) {
    const rootFolderId = await connectorNodeV1.api.getIdForPath(apiOptions, `/${user}`)
    if (rootFolderId) {
      const canvasFolder = await connectorNodeV1.api.createFolder(apiOptions, rootFolderId, 'Canvas')
      const canvasFolderId = await connectorNodeV1.api.getIdForPath(apiOptions, `/${user}/Canvas`)
      if (canvasFolder) {
        const canvasFolderId = await connectorNodeV1.api.getIdForPath(apiOptions, `/${user}/Canvas`)
        await connectorNodeV1.api.createFolder(apiOptions, canvasFolderId, 'All designs')
        await connectorNodeV1.api.createFolder(apiOptions, canvasFolderId, 'All folders')
        await connectorNodeV1.api.createFolder(apiOptions, canvasFolderId, 'Likes')
        await connectorNodeV1.api.createFolder(apiOptions, canvasFolderId, 'Uploads')
        await connectorNodeV1.api.createFolder(apiOptions, canvasFolderId, 'Trash')
        await connectorNodeV1.api.createFolder(apiOptions, canvasFolderId, 'Folders')
        await connectorNodeV1.api.createFolder(apiOptions, canvasFolderId, 'Recent Designs')
        await connectorNodeV1.api.createFolder(apiOptions, canvasFolderId, 'Saved Designs')
      }
    }
  }
}

const getFolders = async user => {
  let foldersFolderId = ''
  const resource = await getBaseResource(apiOptions)
  if (resource) {
    const resourceChildren = await connectorNodeV1.api.getChildrenForId(apiOptions, { id: resource.id })
    const rootExists = resourceChildren.some(({ name }) => name === `${user}`)
    if (!rootExists) {
      await firstInit(resource, user)
      foldersFolderId = await connectorNodeV1.api.getIdForPath(apiOptions, `/${user}/Canvas/Folders`)
    } else {
      foldersFolderId = await connectorNodeV1.api.getIdForPath(apiOptions, `/${user}/Canvas/Folders`)
    }

    if (foldersFolderId) {
      return await connectorNodeV1.api.getChildrenForId(apiOptions, { id: foldersFolderId })
    }
  }
}

const createNewFolder = async (folderParams, user) => {
  const foldersFolderId = await connectorNodeV1.api.getIdForPath(apiOptions, `/${user}/Canvas/Folders`)
  if (foldersFolderId) {
    return await connectorNodeV1.api.createFolder(apiOptions, foldersFolderId, `${folderParams}`)
  }
}

const deleteFolderById = async folderId => {
  const route = `${apiOptions.apiRoot}/files/${folderId}`
  const method = 'DELETE'
  return request(method, route)
}

const getFolderById = async folderId => {
  const route = `${apiOptions.apiRoot}/files/${folderId}`
  const method = 'GET'
  const response = await request(method, route)
  return normalizeResource(response.body)
}

export const requestFolder = folderId => dispatch =>
  getFolderById(folderId).then(
    folder => {
      dispatch(receiveFolder(folder))
    },
    res => dispatch(receiveErrors(res.responseJSON))
  )

export const requestFolders = user => dispatch =>
  getFolders(user).then(
    folders => dispatch(receiveFolders(folders)),
    res => dispatch(receiveErrors(res.responseJSON))
  )

export const createFolder =
  (folderParams, user, success = () => {}) =>
  dispatch =>
    createNewFolder(folderParams.name, user).then(
      folder => {
        dispatch(receiveFolder(folder.body))
        success()
      },
      res => dispatch(receiveErrors(res.responseJSON))
    )

export const updateFolder = folderParams => dispatch =>
  FolderAPIUtil.updateFolder(folderParams).then(
    payload => dispatch(receiveFolder(payload)),
    res => dispatch(receiveErrors(res.responseJSON))
  )

export const deleteFolder =
  (folderId, success = () => {}) =>
  dispatch =>
    deleteFolderById(folderId).then(
      () => {
        dispatch(removeFolder(folderId))
        success()
      },
      res => dispatch(receiveErrors(res.responseJSON))
    )
export const setCurrentPath = path => ({
  type: SET_CURRENT_PATH,
  payload: path
})
