import React from 'react'
import { FiChevronLeft } from 'react-icons/fi'

import TemplatesDrawer from '../../editor/drawers/TemplatesDrawer'
import ElementsDrawer from '../../editor/drawers/ElementsDrawer'
import TextDrawer from '../../editor/drawers/TextDrawer'
import UploadsDrawerContainer from '../../editor/drawers/UploadsDrawer/uploads_drawer_container'
import UnsplashDrawerContainer from '../../editor/drawers/UnsplashDrawer/unsplash_drawer_container'
// import EmptyDrawer from '../../drawers/EmptyDrawer'

import styles from './DesignDrawer.module.css'

class DesignDrawer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { addElement, zoom, closeDrawer, design } = this.props
    const { drawer, closed } = this.props
    const drawers = [
      <TemplatesDrawer addElement={addElement} />,
      <UnsplashDrawerContainer addElement={addElement} design={design} />,
      <ElementsDrawer addElement={addElement} />,
      <TextDrawer addElement={addElement} zoom={zoom} />,
      <UploadsDrawerContainer addElement={addElement} />
      // <EmptyDrawer />,
    ]
    return (
      <div className={styles.designDrawer}>
        <div className={`${styles.drawer} ${styles.showDrawer}`}>{drawers[drawer]}</div>
      </div>
    )
  }
}

export default DesignDrawer
