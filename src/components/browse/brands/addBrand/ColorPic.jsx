import * as React from 'react'
import { useState } from 'react'
import { ChromePicker } from 'react-color'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import styles from './addBrand.module.css'

export default function ColorPic(props) {
  const { setOpened, colorProp, setColorProp, recentColors } = props
  const [colorState, setColorState] = useState(colorProp)

  const handleChangeComplete = color => {
    setColorState(color.hex)
  }

  const handleClose = color => {
    setColorProp(color)
    setOpened(false)
  }

  return (
    <Dialog
      open={true}
      disableEnforceFocus
      hideBackdrop
      PaperProps={{ sx: { position: 'absolute', marginLeft: '700px' } }}
      onBackdropClick={() => handleClose(colorState)}
      sx={{ borderRadius: '50px' }}
    >
      <DialogTitle>
        <p>
          <b>Colors</b>
        </p>
      </DialogTitle>
      <DialogContent sx={{ padding: '0px' }}>
        <div className={styles.colors_container_center}>
          <div className={styles.colors_container}>
            {recentColors.map(color => (
              <div
                key={color}
                className={styles.color_icon}
                style={{ backgroundColor: color }}
                onClick={e => setColorState(color)}
              ></div>
            ))}
          </div>
        </div>

        <div className={styles.pickr_container}>
          <ChromePicker className={styles.picker} color={colorState} onChangeComplete={handleChangeComplete} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
