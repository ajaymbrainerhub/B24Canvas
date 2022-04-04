import { CREATE_BRAND, RECEIVE_BRANDS, RECEIVE_BRAND, DELETE_BRAND } from '../../actions/brands_actions'

const initialState = {}

const brandsReducer = (state = initialState, action) => {
  const brand = action.payload
  switch (action.type) {
    case CREATE_BRAND:
      console.log(`BrandsNEW: ${JSON.stringify({ ...state, [brand.id]: brand })}`)
      return { ...state, [brand.id]: brand }

    case RECEIVE_BRANDS:
      console.log(`BrandsReceived: ${JSON.stringify({ ...state })}`)
      return { ...state }
    case RECEIVE_BRAND:
      return { ...state, [brand.id]: brand }
    case DELETE_BRAND:
      return state.filter(brand => brand.name !== action.payload.name)

    default:
      return state
  }
}

export default brandsReducer
