import cx from 'classnames'
import styles from './DimensionView.module.css'

export const DimensionView = {
  name: 'dimensionView',
  props: {},
  events: {},
  render(moveable, React) {
    const rect = moveable.getRect()
    return (
      <div
        key="dimension-viewer"
        className={cx('moveable-dimension', styles.moveableDimension)}
        style={{ left: `${rect.width / 2}px`, top: `${rect.height + 20}px` }}
      >
        {`${Math.round(rect.offsetWidth)} x ${Math.round(rect.offsetHeight)}`}
      </div>
    )
  }
}
