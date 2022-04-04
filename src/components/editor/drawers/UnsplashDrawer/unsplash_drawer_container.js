import { connect } from 'react-redux'

import UnsplashDrawer from './index'
import { toggleModal } from '../../../../actions/modal_actions'
import { fetchUnsplashQuery, fetchUnsplashPopular } from '../../../../actions/unsplash_actions'

const mapStateToProps = (state, ownProps) => {
  const dimensionsHeight = ownProps.design.height
  const dimensionsWidth = ownProps.design.width
  const searchResults = state.ui.unsplashSearchResults.map(id => state.entities.unsplash[id])
  const popularResults = state.ui.unsplashPopularResults.map(id => state.entities.unsplash[id])
  return {
    searchResults,
    popularResults,
    dimensionsHeight,
    dimensionsWidth
  }
}

const mapDispatchToProps = dispatch => ({
  fetchUnsplashPopular: page => dispatch(fetchUnsplashPopular(page)),
  fetchUnsplashQuery: (page, query) => dispatch(fetchUnsplashQuery(page, query)),
  toggleModal: id => dispatch(toggleModal('externalModal', id))
})

export default connect(mapStateToProps, mapDispatchToProps)(UnsplashDrawer)
