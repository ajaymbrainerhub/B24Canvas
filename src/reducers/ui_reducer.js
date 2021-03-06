import { combineReducers } from 'redux'
import modeReducer from './mode_reducer'
import modalReducer from './modal_reducer'
import unsplashSearchReducer from './unsplash_search_reducer'
import unsplashPopularReducer from './unsplash_popular_reducer'
import searchbarReducer from './searchbar_reducer'
const uiReducer = combineReducers({
  mode: modeReducer,
  modal: modalReducer,
  unsplashSearchResults: unsplashSearchReducer,
  unsplashPopularResults: unsplashPopularReducer,
  searchbar: searchbarReducer
})

export default uiReducer
