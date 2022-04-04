import connectorNodeV1 from '@sava.team/react-filemanager-connector-node-v1'
import { normalizeResource } from '@sava.team/react-filemanager-connector-node-v1/lib/utils/common'
import request from 'superagent'

import { receiveErrors } from './session_actions'

export const RECEIVE_USER_UPLOADS = 'RECEIVE_USER_UPLOADS'
export const RECEIVE_UPLOAD = 'RECEIVE_UPLOAD'
export const REMOVE_UPLOAD = 'REMOVE_UPLOAD'

const apiOptions = {
  ...connectorNodeV1.apiOptions,
  apiRoot: `${process.env.REACT_APP_FILE_MANAGER_API_URL}/${process.env.REACT_APP_BOT_ID}`
}

export const receiveUpload = payload => ({
  type: RECEIVE_UPLOAD,
  payload
})

const removeUpload = payload => ({
  type: REMOVE_UPLOAD,
  payload
})

export const receiveUserUploads = payload => ({
  type: RECEIVE_USER_UPLOADS,
  payload
})

const getBaseResource = async options => {
  const route = `${options.apiRoot}/files/`
  const response = await request.get(route)
  return normalizeResource(response.body)
}

const getUploadedImages = async email => {
  const resource = await getBaseResource(apiOptions)
  if (resource) {
    const uploadsFolderId = await connectorNodeV1.api.getIdForPath(apiOptions, `/${email}/Canvas/Uploads`)
    if (uploadsFolderId) {
      return await connectorNodeV1.api.getChildrenForId(apiOptions, { id: uploadsFolderId })
    }
  }
}

const uploadImage = async (image, email) => {
  const resource = await getBaseResource(apiOptions)
  if (resource) {
    const uploadsFolderId = await connectorNodeV1.api.getIdForPath(apiOptions, `/${email}/Canvas/Uploads`)
    if (uploadsFolderId) {
      return await connectorNodeV1.api.uploadFileToId({
        apiOptions,
        parentId: uploadsFolderId,
        file: {
          type: image.type,
          name: image.name,
          file: image
        },
        onProgress: () => {}
      })
    }
  }
}

const deleteImage = async (image, email) => {
  const resource = await getBaseResource(apiOptions)
  if (resource) {
    let uploadsFolderId = await connectorNodeV1.api.getIdForPath(apiOptions, `/${email}/Canvas/Uploads`)
    if (uploadsFolderId) {
      return await connectorNodeV1.api.removeResource(apiOptions, image)
    }
  }
}

const getImage = image => {
  let fullPath = ''
  image.ancestors.map(path => (fullPath += path.name !== '/' ? `/${path.name}` : ''))
  fullPath += `/${image.name}`
  return {
    id: image.id,
    width: 500, // TODO: получать размеры картинок
    height: 500,
    url: encodeURI(`${process.env.REACT_APP_MEDIA_URL}/cloud/${process.env.REACT_APP_BOT_ID}${fullPath}`)
  }
}

export const fetchUserUploads = email => dispatch =>
  getUploadedImages(email).then(
    images => {
      // TODO: получать урл из медиа, а не самим собирать его
      dispatch(receiveUserUploads(images.map(image => getImage(image))))
    },
    res => dispatch(receiveErrors(res.responseJSON))
  )

export const updateUpload = (formUploadedImage, email) => dispatch =>
  uploadImage(formUploadedImage, email).then(
    image => dispatch(receiveUpload(getImage(image.body[0]))),
    res => dispatch(receiveErrors(res.responseJSON))
  )

export const deleteUpload = (uploadedImageId, email) => dispatch =>
  deleteImage(uploadedImageId, email).then(
    result => dispatch(removeUpload(result)),
    res => dispatch(receiveErrors(res.responseJSON))
  )
