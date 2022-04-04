import React from 'react'
import SVG from 'react-inlinesvg'
import cx from 'classnames'
import { LayersIcon } from '../../../../assets/svg'
import styles from './LayerBtn.module.css'

const LayerBtn = props => {
  const { disabled, togglePanel, isActive } = props
  return (
    <div
      className={cx(styles.layersBtn, disabled ? styles.disabled : null, isActive && !disabled ? styles.active : null)}
      onClick={() => togglePanel()}
    >
      <SVG src={LayersIcon} />
    </div>
  )
}

export default LayerBtn
