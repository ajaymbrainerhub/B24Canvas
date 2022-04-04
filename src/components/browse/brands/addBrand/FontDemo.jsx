import * as React from 'react'
import { useState } from 'react'
import styles from './addBrand.module.css'
import { Button, Grid, Typography } from '@material-ui/core'
import { MdModeEdit } from 'react-icons/md'
import FontPicker from './FontPicker'

export default function FontDemo({ title, font, type, action }) {
  const [toggleSettings, setToggleSettings] = useState(false)

  return (
    <>
      <div className={styles.cardRow}>
        <div className={styles.cardRow}>
          <Typography
            className={styles.textsizeTitle}
            style={{
              fontSize: `${font.fontSize}px`,
              fontFamily: font.family,
              fontWeight: font.fontWeight,
              textTransform: font.textTransform,
              fontStyle: font.fontStyle,
              textDecoration: font.textDecoration
            }}
          >
            {`${title}, `}
          </Typography>

          <Typography
            className={styles.textsize}
            style={{
              fontSize: `${font.fontSize}px`,
              fontFamily: font.family,
              fontWeight: font.fontWeight,
              textTransform: font.textTransform,
              fontStyle: font.fontStyle,
              textDecoration: font.textDecoration
            }}
          >
            {`${font.fontSize}`}
          </Typography>
        </div>

        <Button className={styles.iconBtn} onClick={() => setToggleSettings(!toggleSettings)}>
          <MdModeEdit size={12} color="silver" />
        </Button>
      </div>
      {toggleSettings && <FontPicker type={type} action={action} font={font} />}
    </>
  )
}
