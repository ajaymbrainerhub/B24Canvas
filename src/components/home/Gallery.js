import * as React from 'react'
import Masonry from 'react-masonry-component'
import { connect } from 'react-redux'

import { createDesign } from '../../actions/design_actions'

import styles from './Gallery.module.css'

class Gallery extends React.Component {
  render() {
    const childElements = this.props.elements.map(design => {
      return (
        <li
          className={styles.design}
          onClick={() => {
            const { createDesign, currentUser, history, size } = this.props

            const newDesign = {
              ...design,
              creatorId: currentUser.id,
              public:null,
              title: `Untitled Design - ${design.title}`,
              category: '',
              description: '',
              isPublic: false,
              isTemplate: false,
              width: size?.dimensions ? size?.dimensions[0] : design.width,
              height: size?.dimensions ? size?.dimensions[1] : design.height
             
            }

            delete newDesign.id

            createDesign(newDesign).then(res => history.push(`/design/${res.payload.data.result.designs.id}`))
          }}
        >
          <img
            src={encodeURI(
              `${process.env.REACT_APP_MEDIA_URL}/cloud/${process.env.REACT_APP_BOT_ID}/${design?.email}/Canvas/All designs/${design.id}.png`
            )}
            alt={design.title}
          />
        </li>
      )
    })

    return (
      <Masonry
        className={'my-gallery-class'}
        elementType={'ul'}
        options={{ transitionDuration: 0 }}
        disableImagesLoaded={false}
        updateOnEachImageLoad={false}
        imagesLoadedOptions={{ background: '.my-bg-image-el' }}
      >
        {childElements}
      </Masonry>
    )
  }
}

export default connect(
  state => ({
    currentUser: state.entities.users[state.session.id]
  }),
  dispatch => ({
    createDesign: design => dispatch(createDesign(design))
  })
)(Gallery)
