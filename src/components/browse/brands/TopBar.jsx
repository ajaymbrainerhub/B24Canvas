import * as React from 'react'

import styles from './index.module.css'

export default function TopBar({ title }) {
  return (
    <div className={styles.topBar}>
      <h1 className={styles.indexTitle}>{title}</h1>
    </div>
  )
}
