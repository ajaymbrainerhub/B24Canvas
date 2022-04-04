import React from 'react'

import { Button, Grid, Typography } from '@material-ui/core'
import { BsFillImageFill } from 'react-icons/bs'
import { MdModeEdit } from 'react-icons/md'
import styles from './BrandsKitDrawer.module.css'

const brandKit = {
  brandLogo: '',
  fonts: [
    {
      family: 'Proxima Nova',
      size: 36
    },
    {
      family: 'Proxima Nova',
      size: 32
    },
    {
      family: 'Proxima Nova',
      size: 28
    }
  ],
  color: '#004DDE'
}

function BrandsKitDrawer({ design, selection, receiveElement, setSelected, element }) {
  const changeColor = () => {
    const selectedElement = design.elementsAttributes.find(element => element.id === selection)
    if (selectedElement) {
      selectedElement.elementableAttributes['color'] = brandKit.color
      setSelected(selectedElement)
    }
  }

  const changeFont = font => {
    const selectedElement = design.elementsAttributes.find(element => element.id === selection)
    if (selectedElement) {
      selectedElement.elementableAttributes['fontFamily'] = font.family
      selectedElement.elementableAttributes['fontSize'] = font.size
      setSelected(selectedElement)
    }
  }

  return (
    <div className={styles.templateInner}>
      <Typography className={styles.templateInnerTitle}>Brand Kit</Typography>

      {/* logo section */}
      <div className={styles.grayCard}>
        <Typography className={styles.grayCardTitle}>Brand Logo</Typography>
        <div className={styles.cardRow}>
          <BsFillImageFill size={60} color="#fff" />
          <Button class={styles.whiteBtn}>Add Logo</Button>
        </div>
      </div>

      {/* fonts section */}
      <div className={styles.grayCard}>
        <Typography className={styles.grayCardTitle}>Fonts</Typography>
        {brandKit.fonts.map((font, idx) => (
          <div className={idx}>
            <div className={styles.cardRow}>
              <div className={styles.cardRow} onClick={() => changeFont(font)}>
                <Typography
                  className={styles.textsizeTitle}
                  style={{ fontSize: font.size, fontFamily: font.family }}
                >{`${font.family}`}</Typography>
                <Typography
                  className={styles.textsize}
                  style={{ fontSize: font.size, fontFamily: font.family }}
                >{`${font.size}`}</Typography>
              </div>
              <Button className={styles.iconBtn}>
                <MdModeEdit size={12} color="#fff" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* color palette section */}
      <div className={styles.grayCard}>
        <Typography className={styles.grayCardTitle}>Brand Colors</Typography>
        <div className={styles.cardRow}>
          <div
            style={{
              backgroundColor: brandKit.color,
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: '#ddd',
              height: '60px',
              width: '60px',
              borderRadius: 8,
              overflow: 'hidden'
            }}
            onClick={changeColor}
          ></div>
          <Button class={styles.whiteBtn}>Add Brand Color</Button>
        </div>
      </div>
    </div>
  )
}

export default BrandsKitDrawer
