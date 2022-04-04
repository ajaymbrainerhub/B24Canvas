import SVG from 'react-inlinesvg'
import { CropIcon } from '../../../../assets/svg'
import styles from './EditablePanel.module.css'
import cx from 'classnames'

export const EditablePanel = {
  name: 'editablePanel',
  props: {},
  events: {},
  render(moveable, React) {
    const rect = moveable.getRect()
    const { pos2 } = moveable.state
    return (
      <div
        className={cx('moveable-editable', styles.moveableEditable)}
        key="editable-viewer"
        style={{ transform: `translate(${pos2[0]}px, (${pos2[1]}px) rotate((${rect.rotation}deg) translate(10px)` }}
      >
        <button
          className={cx('moveable-button', styles.moveableButton, moveable.props.clippable && styles.active)}
          onClick={() => moveable.props.onClippableToggle()}
        >
          <SVG src={CropIcon} />
        </button>
      </div>
    )
  }
}
