import axios from 'axios'
import connectorNodeV1 from '@sava.team/react-filemanager-connector-node-v1'
import { normalizeResource } from '@sava.team/react-filemanager-connector-node-v1/lib/utils/common'
import request from 'superagent'
import 'regenerator-runtime/runtime'

import * as DesignAPIUtil from '../util/design_api_util'
import { receiveErrors } from './session_actions'

axios.defaults.withCredentials = true

export const RECEIVE_DESIGNS = 'RECEIVE_DESIGNS'
export const RECEIVE_UPDATED_DESIGN = 'RECEIVE_UPDATED_DESIGN'
export const RECEIVE_DESIGN = 'RECEIVE_DESIGN'
export const REMOVE_DESIGN = 'REMOVE_DESIGN'

export const RECEIVE_TEMPLATES = 'RECEIVE_TEMPLATES'

const apiOptions = {
  ...connectorNodeV1.apiOptions,
  apiRoot: `${process.env.REACT_APP_FILE_MANAGER_API_URL}/${process.env.REACT_APP_BOT_ID}`
}

const getBaseResource = async options => {
  const route = `${options.apiRoot}/files/`
  const response = await request.get(route)
  return normalizeResource(response.body)
}

const receiveDesign = design => ({
  type: RECEIVE_DESIGN,
  payload: design
})

const receiveDesigns = designs => ({
  type: RECEIVE_DESIGNS,
  payload: designs
})

const receiveUpdatedDesign = design => ({
  type: RECEIVE_UPDATED_DESIGN,
  payload: design
})

const receiveTemplates = templates => ({
  type: RECEIVE_TEMPLATES,
  payload: templates
})

const removeDesign = payload => ({
  type: REMOVE_DESIGN,
  payload
})

const deleteDesignId = async (designId, email) => {
  const resource = await getBaseResource(apiOptions)
  let file = {}
  if (resource) {
    const fileId = await connectorNodeV1.api.getIdForPath(apiOptions, `/${email}/Canvas/All designs/${designId}.png`)

    if (fileId) {
      file.id = fileId
      await connectorNodeV1.api.removeResources(apiOptions, [file])
    }

    let result = axios.delete(`${process.env.REACT_APP_API_URL}/design/${process.env.REACT_APP_BOT_ID}/${designId}`, {
      withCredentials: true
    })

    return result
  }
}

export const requestDesign = designId => dispatch =>
  axios
    .get(`${process.env.REACT_APP_API_URL}/design/${process.env.REACT_APP_BOT_ID}/${designId}`, {
      withCredentials: true
    })
    .then(
      payload => dispatch(receiveDesign(payload)),
      res => dispatch(receiveErrors(res.responseJSON))
    )

export const requestDesigns = querry => dispatch => {
  axios
    .get(`${process.env.REACT_APP_API_URL}/design/${process.env.REACT_APP_BOT_ID}${querry}`, {
      withCredentials: true
    })
    .then(
      result => {
        console.log(result)
        dispatch(receiveDesigns(result.data.result))
      },
      res => dispatch(receiveErrors(res.responseJSON))
    )
}

export const requestTemplates =
  (querry, withCredentials = false) =>
  dispatch => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/design/${process.env.REACT_APP_BOT_ID}${querry}`, {
        withCredentials: withCredentials
      })
      .then(
        result => {
          console.log(result)
          dispatch(receiveTemplates(result.data.result))
        },
        res => dispatch(receiveErrors(res.responseJSON))
      )
  }

// export const requestTemplates = () => dispatch =>
//   DesignAPIUtil.fetchTemplates().then(
//     designs => dispatch(receiveDesigns(designs)),
//     res => dispatch(receiveErrors(res.responseJSON))
//   )

export const createDesign = formDesign => dispatch =>
  axios
    .post(`${process.env.REACT_APP_API_URL}/design/${process.env.REACT_APP_BOT_ID}`, formDesign, {
      withCredentials: true
    })
    .then(payload => dispatch(receiveDesign(payload)))
    .catch(res => dispatch(receiveErrors(res.responseJSON)))

export const updateDesign = formDesign => dispatch =>
  axios
    .post(`${process.env.REACT_APP_API_URL}/design/${process.env.REACT_APP_BOT_ID}/${formDesign.id}`, formDesign, {
      withCredentials: true
    })
    .then(payload => {
      if (payload.data.success) {
        console.log(`UPDATED_DESIGN: ${JSON.stringify(payload.data.result.updated[1])}`)
        dispatch(receiveUpdatedDesign(payload.data.result.updated[1]))
      } else {
        console.log('Not success')
        dispatch(receiveErrors(res.responseJSON))
      }
    })
    .catch(res => {
      console.log(JSON.stringify(res))
      dispatch(receiveErrors(res.responseJSON))
    })

export const deleteDesign = (designId, email) => dispatch => {
  deleteDesignId(designId, email).then(result => {
    if (result) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/design/${process.env.REACT_APP_BOT_ID}`, {
          withCredentials: true
        })
        .then(
          result => {
            dispatch(receiveDesigns(result.data.result))
          },
          res => dispatch(receiveErrors(res.responseJSON))
        )
    }
  })
}
