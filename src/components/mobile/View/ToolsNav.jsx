import React from 'react'
import {
  FiLayout,
  FiImage,
  FiGrid,
  FiType,
  FiUploadCloud,
  FiDroplet,
  FiFolder,
  FiMoreHorizontal,
  FiMinimize2
} from 'react-icons/fi'
import styles from './DesignDrawer.module.css'

const ToolsNav = ({ changeDrawer, current, closed, animate, closeDrawer }) => {
  const activeButton = id => (current === id && !closed ? 'active btn-tools' : 'btn-tools')
  return (
    <nav className={styles.buttonsNav}>
      <button type="button" className={activeButton(0)} onClick={() => changeDrawer(0)}>
        <FiLayout />
        <span>Templates</span>
      </button>
      <button type="button" className={activeButton(1)} onClick={() => changeDrawer(1)}>
        <FiImage />
        <span>Photos</span>
      </button>
      <button type="button" className={activeButton(2)} onClick={() => changeDrawer(2)}>
        <FiGrid />
        <span>Elements</span>
      </button>
      <button type="button" className={activeButton(3)} onClick={() => changeDrawer(3)}>
        <FiType />
        <span>Text</span>
      </button>
      <button type="button" className={activeButton(4)} onClick={() => changeDrawer(4)}>
        <FiUploadCloud />
        <span>Uploads</span>
      </button>
    </nav>
  )
}

export default ToolsNav
