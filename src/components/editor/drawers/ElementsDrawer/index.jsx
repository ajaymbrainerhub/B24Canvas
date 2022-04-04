import React from 'react'
import SVG from 'react-inlinesvg'
import { getShapes } from '../../../utils/shapes.constants'
import styles from './ElementsDrawer.module.css'
import scrollbar from '../scrollbar.module.css'

class ElementsDrawer extends React.Component {
  constructor(props) {
    super(props)
    this.state = { info: false }
  }

  addElement(shape) {
    const { addElement } = this.props
    const element = {
      elementableType: 'Shape',
      transparency: 1,
      zIndex: 0,
      posX: 0,
      posY: 0,
      // _destroy: true
      elementableAttributes: {
        shape,
        color: '#c7d0d8',
        width: 500,
        height: 500
      }
    }
    addElement(element)
  }

  render() {
    const mockupResponse = getShapes()
    return (
      <>
        {/* <DrawerSearch placeholder="Search icons and shapes" /> */}
        <div className={scrollbar.customScroll}>
          <div className={styles.elementsDrawer}>
            <div className={styles.itemList}>
              {mockupResponse.map(item => (
                <div key={item.id} className={styles.item} onClick={() => this.addElement(item.shape)}>
                  <SVG src={item.image} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default ElementsDrawer
