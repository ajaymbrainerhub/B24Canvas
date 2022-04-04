import React, { useState, useEffect } from 'react'
import { Range } from 'react-range'
import SVG from 'react-inlinesvg'
import cx from 'classnames'
import { SketchPicker } from 'react-color'
import { Popover } from '@material-ui/core'
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
} from '../../assets/svg'
import styles from './DesignTools.module.css'
import { SignalCellular0Bar } from '@material-ui/icons'

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

function DesignTools(props) {
  const [state, setStateRaw] = useState({
    dropdown: null,
    selected: {},
    selectedId: null,
    selectedColor: '',
    anchorEl: null
  })
  const [colorPicker, setColorPicker] = useState({ active: false, anchor: null })
  const [isFlipedImage, setIsFlipedImage] = useState(false)
  const { selected } = state

  function setState(obj) {
    setStateRaw({ ...state, ...obj })
  }

  function changeValue(attr, value) {
    const { selected } = state
    const { receiveElement } = props

    if (attr === 'posX' || attr === 'posY' || attr === 'transparency' || attr === 'zIndex') {
      if (value) {
        selected[attr] = value
        setState({ selected })
      } else {
        return e => {
          selected[attr] = e.target.value
          setState({ selected })
        }
      }
    }
    if (value) {
      selected.elementableAttributes[attr] = value
      setState({ selected })
    } else {
      return e => {
        selected.elementableAttributes[attr] = e.target.value
        setState({ selected })
      }
    }
    receiveElement({ elementableAttributes: selected.elementableAttributes })
  }

  function deleteElement() {
    let { selected } = state
    selected._destroy = true
    const { receiveElement, setSelection } = props
    receiveElement(selected)
    setSelection(null)
  }

  function updateStuff(e) {
    e.preventDefault()
    const { selected } = state
    const { receiveElement } = props
    receiveElement({ elementableAttributes: { color: selected.elementableAttributes.color } })
  }

  function togglePicker(e) {
    setColorPicker({ active: !colorPicker.active, anchor: e ? e.currentTarget : null })
  }

  function toggleImage(flip) {
    const image = props.elements.find(element => element.id === props.selection)
    image.elementableAttributes['transform'] = flip ? 'scaleX(-1)' : 'scaleX(1)'
    const { receiveElement, setSelection } = props
    receiveElement(image)
    setSelection(null)
  }

  useEffect(() => {
    const image = props.elements.find(element => element.id === props.selection)
    if (image?.elementableAttributes.transform === 'scaleX(-1)') {
      setIsFlipedImage(true)
    }
    setState({ selected: props.element ?? props.elements.find(element => element.id === props.selection) })
  }, [props.element, props.selection])

  if (!selected || Object.keys(selected).length === 0) {
    return (
      <div className={styles.designTools}>
        <span className={styles.nothingSelected}>Nothing Selected</span>
      </div>
    )
  } else {
    return (
      <div className={styles.designTools}>
        <Popover
          id="color_chooser"
          open={colorPicker.active}
          anchorEl={colorPicker.anchor}
          onClose={togglePicker}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
        >
          <SketchPicker
            disableAlpha
            color={state.selectedColor}
            onChange={color => {
              changeValue('color', color.hex)
              setState({ selectedColor: color })
            }}
          />
        </Popover>
        <form
          className={styles.designForm}
          onChange={updateStuff}
          // onSubmit={(e) => e.preventDefault()}
        >
          <div className={styles.tools}>
            {/* {selected.elementableType === 'Shape' ? (
              <>
                <span>Width:</span>
                <input type="text" className="input-attr" size={selected.elementableAttributes.width.toString().length + 1} value={selected.elementableAttributes.width} onChange={changeValue('width')} />
                <span>Height:</span>
                <input type="text" className="input-attr" size={selected.elementableAttributes.height.toString().length + 1} value={selected.elementableAttributes.height} onChange={changeValue('height')} />
              </>
            ) : ''} */}
            {selected.elementableType === 'Text' && (
              <div className={styles.editText}>
                <label htmlFor="text">Edit Text</label>
                <textarea
                  name="text"
                  rows={5}
                  size={selected.elementableAttributes.text.length + 1}
                  value={selected.elementableAttributes.text}
                  onChange={changeValue('text')}
                />
              </div>
            )}
            {(selected.elementableType === 'Text' || selected.elementableType === 'Shape') && (
              <div className={styles.colorAndControl}>
                <label
                  className={cx('btn-color', styles.colorChoose)}
                  style={{ backgroundColor: selected.elementableAttributes.color }}
                >
                  {/*<input*/}
                  {/*    type="color"*/}
                  {/*    className={styles.hidden}*/}
                  {/*    size={selected.elementableAttributes.color.length + 1}*/}
                  {/*    value={selected.elementableAttributes.color}*/}
                  {/*    onChange={changeValue('color')}*/}
                  {/*  />*/}
                </label>
                <button type="button" onClick={togglePicker} className={styles.changeColorButton}>
                  Change color
                </button>
                <button type="button" className={styles.deleteBtn} onClick={deleteElement}>
                  <SVG src={DeleteIcon} />
                </button>
              </div>
            )}
            {selected.elementableType === 'Shape' && (
              <div className="icons-container">
                <div className="joinButton">
                  <button type="button" onClick={() => toggleImage(false)} disabled={!isFlipedImage}>
                    <SignalCellular0Bar />
                  </button>
                  <button type="button" onClick={() => toggleImage(true)} disabled={isFlipedImage}>
                    <SignalCellular0Bar />
                  </button>
                </div>
              </div>
            )}
            {selected.elementableType === 'Text' ? (
              <div className={styles.changeFont}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <select
                    className={styles.fontFamily}
                    name="fontFamily"
                    id="fontFamily"
                    defaultValue={selected.elementableAttributes.fontFamily}
                    onChange={changeValue('fontFamily')}
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
                      className="input-attr"
                      size={selected.elementableAttributes.fontSize.toString().length + 1}
                      value={selected.elementableAttributes.fontSize}
                      onChange={changeValue('fontSize')}
                    />
                    <div className={styles.fontSizeControl}>
                      <span
                        className={styles.fontSizeBtn}
                        onClick={() => changeValue('fontSize', parseInt(selected.elementableAttributes.fontSize) - 1)}
                      >
                        <SVG src={MinusIcon} />
                      </span>
                      <span
                        className={styles.fontSizeBtn}
                        onClick={() => changeValue('fontSize', parseInt(selected.elementableAttributes.fontSize) + 1)}
                      >
                        <SVG src={PlusIcon} />
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', margin: '1.5rem 0' }}>
                  <div
                    className={styles.fontWeight}
                    style={
                      selected.elementableAttributes.fontWeight === 800
                        ? { background: '#D6D6D6' }
                        : { background: '#F1F1F1' }
                    }
                    onClick={() => {
                      switch (selected.elementableAttributes.fontWeight) {
                        case 800:
                          changeValue('fontWeight', 400)
                          break
                        default:
                          changeValue('fontWeight', 800)
                          break
                      }
                    }}
                  >
                    <SVG src={BoldIcon} />
                  </div>
                  <div
                    className={styles.fontWeight}
                    style={
                      selected.elementableAttributes.textTransform === 'uppercase'
                        ? { background: '#D6D6D6' }
                        : { background: '#F1F1F1' }
                    }
                    onClick={() => {
                      switch (selected.elementableAttributes.textTransform) {
                        case 'none':
                          changeValue('textTransform', 'uppercase')
                          break
                        default:
                          changeValue('textTransform', 'none')
                          break
                      }
                    }}
                  >
                    <SVG src={AaIcon} />
                  </div>
                  <div
                    className={styles.fontWeight}
                    style={
                      selected.elementableAttributes.fontStyle === 'italic'
                        ? { background: '#D6D6D6' }
                        : { background: '#F1F1F1' }
                    }
                    onClick={() => {
                      switch (selected.elementableAttributes.fontStyle) {
                        case 'italic':
                          changeValue('fontStyle', 'normal')
                          break
                        default:
                          changeValue('fontStyle', 'italic')
                          break
                      }
                    }}
                  >
                    <SVG src={ItalicIcon} />
                  </div>
                  <div
                    className={styles.fontWeight}
                    style={
                      selected.elementableAttributes.textDecoration === 'underlined'
                        ? { background: '#D6D6D6' }
                        : { background: '#F1F1F1' }
                    }
                    onClick={() => {
                      switch (selected.elementableAttributes.textDecoration) {
                        case 'underlined':
                          changeValue('textDecoration', 'none')
                          break
                        default:
                          changeValue('textDecoration', 'underline')
                          break
                      }
                    }}
                  >
                    <SVG src={UnderlinedIcon} />
                  </div>
                </div>
                <div style={{ display: 'flex', margin: '0.5rem 0 1.5rem' }}>
                  <select
                    name="lineHeight"
                    id="lineHeight"
                    className={styles.fontFamily}
                    defaultValue={selected.elementableAttributes.lineHeight}
                    onChange={changeValue('lineHeight')}
                  >
                    {settingsValue.text.spacing.map((item, index) => (
                      <option key={index} value={item}>
                        Spacing: {item}
                      </option>
                    ))}
                  </select>
                  <div className={styles.textAlign}>
                    <button type="button" onClick={() => changeValue('textAlign', 'left')}>
                      <SVG src={LeftText} />
                    </button>
                    <button type="button" onClick={() => changeValue('textAlign', 'center')}>
                      <SVG src={CenterText} />
                    </button>
                    <button type="button" onClick={() => changeValue('textAlign', 'right')}>
                      <SVG src={RightText} />
                    </button>
                  </div>
                </div>
              </div>
            ) : selected.elementableType === 'Image' ? (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem'
                  }}
                >
                  <span>Width:</span>
                  <input
                    type="number"
                    className="input-attr"
                    size={selected.elementableAttributes.width.toString().length + 1}
                    value={selected.elementableAttributes.width}
                    onChange={changeValue('width')}
                  />
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1.5rem'
                  }}
                >
                  <span>Height:</span>
                  <input
                    type="number"
                    className="input-attr"
                    size={selected.elementableAttributes.height.toString().length + 1}
                    value={selected.elementableAttributes.height}
                    onChange={changeValue('height')}
                  />
                </div>
                <div className="icons-container">
                  <div className="joinButton">
                    <button type="button" onClick={() => toggleImage(false)} disabled={!isFlipedImage}>
                      <SignalCellular0Bar />
                    </button>
                    <button type="button" onClick={() => toggleImage(true)} disabled={isFlipedImage}>
                      <SignalCellular0Bar />
                    </button>
                  </div>
                </div>
                <button type="button" className={styles.deleteBtn} onClick={deleteElement}>
                  <SVG src={DeleteIcon} />
                </button>
              </div>
            ) : (
              ''
            )}
            {/* <span>X:</span>
            <input type="text" className="input-attr" size={selected.posX.toString().length + 1} value={selected.posX} onChange={changeValue('posX')} />
            <span>Y:</span>
            <input type="text" className="input-attr" size={selected.posY.toString().length + 1} value={selected.posY} onChange={changeValue('posY')} /> */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: '1.5rem 0'
              }}
            >
              <span>Order:</span>
              <input
                type="text"
                className="input-attr"
                size={selected.zIndex.toString().length + 1}
                value={selected.zIndex}
                onChange={changeValue('zIndex')}
              />
            </div>
            {/* <button type="submit" className="btn-color">Submit</button> */}
            <div className={styles.opacityChange}>
              <span>Transparency</span>
              <div className={styles.slider}>
                <SVG src={TransIcon} />
                <Range
                  step={0.01}
                  min={0}
                  max={1}
                  values={[selected.transparency]}
                  onChange={values => changeValue('transparency', values[0])}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: '4px',
                        width: '100%',
                        backgroundColor: '#ddd'
                      }}
                    >
                      {children}
                    </div>
                  )}
                  renderThumb={({ props, isDragged }) => (
                    <div
                      {...props}
                      style={{
                        ...props.style,
                        height: '16px',
                        width: '16px',
                        borderRadius: '100%',
                        backgroundColor: '#000000',
                        border: '3px solid #FFF',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        boxShadow: '0px 2px 6px #AAA'
                      }}
                    >
                      <div
                        style={{
                          height: '16px',
                          width: '16px',
                          borderRadius: '100%',
                          backgroundColor: '#000'
                        }}
                      />
                    </div>
                  )}
                />
                <div className={styles.info}>{selected.transparency.toFixed(1) * 100 + '%'}</div>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default DesignTools
