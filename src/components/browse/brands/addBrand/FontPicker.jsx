import * as React from 'react'
import styles from './addBrand.module.css'
import SVG from 'react-inlinesvg'

const settingsValue = {
  text: {
    font: [
      'Arial',
      'DejaVu Sans',
      'Monospace',
      'Open Sans',
      'Open Sans Condensed',
      'Roboto',
      'Roboto Condensed',
      'Tahoma'
    ],
    spacing: [0.5, 1, 1.25, 1.5, 2, 2.5]
  }
}

import {
  PlusIcon,
  MinusIcon,
  DeleteIcon,
  BoldIcon,
  AaIcon,
  ItalicIcon,
  TransIcon,
  UnderlinedIcon,
  RightText,
  LeftText,
  CenterText
} from '../../../../assets/svg'

export default function FontPicker({ type, action, font }) {
  const handleChange = event => {
    action(type, { ...font, [event.target.name]: event.target.value })
  }

  const handleChangeItems = (item, value) => {
    action(type, { ...font, [item]: value })
  }

  return (
    <>
      <div className={styles.changeFont}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <select
            className={styles.fontFamily}
            name="family"
            id="fontFamily"
            defaultValue={font.family}
            onChange={handleChange}
          >
            {settingsValue.text.font.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <div className={styles.fontSize}>
            <input
              type="number"
              name="fontSize"
              className="input-attr"
              // size={selected.elementableAttributes.fontSize.toString().length + 1}
              value={font.fontSize}
              onChange={handleChange}
            />
            <div className={styles.fontSizeControl}>
              <span
                name="fontNumber"
                className={styles.fontSizeBtn}
                onClick={() => handleChangeItems('fontSize', font.fontSize - 1)}
              >
                <SVG src={MinusIcon} />
              </span>
              <span className={styles.fontSizeBtn} onClick={() => handleChangeItems('fontSize', font.fontSize + 1)}>
                <SVG src={PlusIcon} />
              </span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', margin: '1.5rem 0' }}>
          <div
            className={styles.fontWeight}
            style={font.fontWeight === 800 ? { background: '#D6D6D6' } : { background: '#F1F1F1' }}
            onClick={() => {
              console.log(`Weight: ${font.fontWeight}`)
              switch (font.fontWeight) {
                case 800:
                  handleChangeItems('fontWeight', 400)

                  break
                default:
                  handleChangeItems('fontWeight', 800)

                  break
              }
            }}
          >
            <SVG src={BoldIcon} />
          </div>{' '}
          <div
            className={styles.fontWeight}
            style={font.textTransform === 'uppercase' ? { background: '#D6D6D6' } : { background: '#F1F1F1' }}
            onClick={() => {
              switch (font.textTransform) {
                case 'none':
                  handleChangeItems('textTransform', 'uppercase')
                  break
                default:
                  handleChangeItems('textTransform', 'none')
                  break
              }
            }}
          >
            <SVG src={AaIcon} />
          </div>{' '}
          <div
            className={styles.fontWeight}
            style={font.fontStyle === 'italic' ? { background: '#D6D6D6' } : { background: '#F1F1F1' }}
            onClick={() => {
              switch (font.fontStyle) {
                case 'italic':
                  handleChangeItems('fontStyle', 'normal')
                  break
                default:
                  handleChangeItems('fontStyle', 'italic')
                  break
              }
            }}
          >
            <SVG src={ItalicIcon} />
          </div>{' '}
          <div
            className={styles.fontWeight}
            style={font.textDecoration === 'underline' ? { background: '#D6D6D6' } : { background: '#F1F1F1' }}
            onClick={() => {
              switch (font.textDecoration) {
                case 'underline':
                  handleChangeItems('textDecoration', 'none')
                  break
                default:
                  handleChangeItems('textDecoration', 'underline')
                  break
              }
            }}
          >
            <SVG src={UnderlinedIcon} />
          </div>
        </div>
        {/* <div style={{ display: 'flex', margin: '0.5rem 0 1.5rem' }}>
                  <select
                    name="lineHeight"
                    id="lineHeight"
                    className={styles.fontFamily}
                    defaultValue={selected.elementableAttributes.lineHeight}
                   // onChange={this.changeValue('lineHeight')}
                  >
                    {settingsValue.text.spacing.map((item, index) => (
                      <option key={index} value={item}>
                        Spacing: {item}
                      </option>
                    ))}
                  </select>
                  <div className={styles.textAlign}>
                    <button type="button" 
                   >
                      <SVG src={LeftText} />
                    </button>
                    <button type="button" 
                    >
                      <SVG src={CenterText} />
                    </button>
                    <button type="button" 
                    >
                      <SVG src={RightText} />
                    </button>
                  </div>
                </div> */}
      </div>
    </>
  )
}
