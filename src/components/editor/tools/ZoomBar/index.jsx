import React, { useState, useEffect, useCallback } from 'react'
import cx from 'classnames'
import SVG from 'react-inlinesvg'

import { ZoomInIcon, ZoomOutIcon } from '../../../../assets/svg'
import styles from './ZoomBar.module.css'

const ZoomBar = props => {
  const { changeZoom } = props
  const zoomStep = 0.25
  const maxZoomValue = 1.5
  const [currentZoom, setCurrentZoom] = useState(0.5)

  const updateZoomValue = (value, type) => {
    switch (type) {
      case 'minus':
        if (value > zoomStep) setCurrentZoom(value - zoomStep)
        break
      default:
        if (value < maxZoomValue) setCurrentZoom(value + zoomStep)
        break
    }
  }

  const updateCurrentZoom = useCallback(value => {
    changeZoom(value)
  }, [])

  useEffect(() => {
    updateCurrentZoom(currentZoom)
  }, [currentZoom])

  return (
    <div className={styles.zoomBar}>
      <div className={styles.buttonBlock}>
        <div
          className={cx(styles.buttonZoom, currentZoom <= zoomStep ? styles.disabledBtn : null)}
          onClick={() => updateZoomValue(currentZoom, 'minus')}
        >
          <SVG src={ZoomOutIcon} />
        </div>
        <div className={styles.zoomValue}>{currentZoom * 100}%</div>
        <div
          className={cx(styles.buttonZoom, currentZoom >= maxZoomValue ? styles.disabledBtn : null)}
          onClick={() => updateZoomValue(currentZoom, 'plus')}
        >
          <SVG src={ZoomInIcon} />
        </div>
      </div>
    </div>
  )
}

export default ZoomBar
