import axios from 'axios'
axios.defaults.withCredentials = true
export const CREATE_BRAND = 'CREATE_BRAND'
export const RECEIVE_BRANDS = 'RECEIVE_BRANDS'
export const RECEIVE_BRAND = 'RECEIVE_BRAND'
export const DELETE_BRAND = 'DELETE_BRAND'
import { receiveErrors } from './session_actions'

const CreateBrand = brand => ({
  type: CREATE_BRAND,
  payload: brand
})

export const receiveBrands = () => ({
  type: RECEIVE_BRANDS
})
export const receiveBrand = brand => ({
  type: RECEIVE_BRANDS,
  payload: brand
})

export const deleteBrand = brand => ({
  type: DELETE_BRAND,
  payload: brand
})

export const createBrand = brand => dispatch => {
  console.log(`SENT_BRAND_DATA: ${JSON.stringify(brand)}`)
  axios
    .post(`${process.env.REACT_APP_API_URL}/brand/${process.env.REACT_APP_BOT_ID}`, brand, {
      withCredentials: true
    })
    .then(
      payload => {
        console.log(`SENT_BRAND_DATA: ${JSON.stringify(payload)}`)
        dispatch(CreateBrand(payload))
      },
      res => {
        console.log('ERRRR')
        dispatch(receiveErrors(res.responseJSON))
      }
    )
}
