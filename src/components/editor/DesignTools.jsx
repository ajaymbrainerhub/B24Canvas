import React from 'react'
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

class DesignTools extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dropdown: null,
      selected: {},
      selectedId: null,
      colorPicker: false,
      selectedColor: '',
      anchorEl: null
    }
    this.updateStuff = this.updateStuff.bind(this)
    this.deleteElement = this.deleteElement.bind(this)
    // this.deleteKeyDown = this.deleteKeyDown.bind(this);
    this.changeValue = this.changeValue.bind(this)
  }

  // componentDidMount() {
  //   document.addEventListener('keydown', this.deleteKeyDown);
  // }

  componentDidUpdate(prevProps) {
    const { element } = this.props
    if (!prevProps.element && element) {
      this.setState({ selected: element })
      this.props.setSelected(element)
    } else if (prevProps.element && !element) {
      this.setState({ selected: {} })
      this.props.setSelected({})
    } else if (prevProps.element && element && prevProps.element.id !== element.id) {
      this.setState({ selected: element })
      this.props.setSelected(element)
    }
    // if (!prevProps.element && element && element.id !== prevProps.element.id) {
    // }
    // if (Object.keys(prevProps.selected)[0] !== Object.keys(selected)[0]) {
    //   this.updateSelected();
    // }
  }

  // componentWillUnmount() {
  //   document.removeEventListener('keydown', this.deleteKeyDown);
  // }

  changeValue(attr, value) {
    const { selected } = this.state

    if (attr === 'posX' || attr === 'posY' || attr === 'transparency' || attr === 'zIndex') {
      if (value) {
        selected[attr] = value
        this.setState({ selected })
      } else {
        return e => {
          selected[attr] = e.target.value
          this.setState({ selected })
        }
      }
    }
    if (value) {
      selected.elementableAttributes[attr] = value
      this.setState({ selected })
    } else {
      return e => {
        selected.elementableAttributes[attr] = e.target.value
        this.setState({ selected })
      }
    }
  }

  // deleteKeyDown(event) {
  //   const { selected } = this.state;
  //   if (event.keyCode === 8 && Object.keys(selected).length !== 0) {
  //     this.deleteElement();
  //   }
  // }

  deleteElement() {
    const { selected } = this.state
    const { receiveElement, setSelection } = this.props
    receiveElement({ ...selected, _destroy: true })
    setSelection(null)
  }

  updateStuff(e) {
    e.preventDefault()
    const { selected } = this.state
    const { receiveElement } = this.props
    receiveElement({ elementableAttributes: { color: selected.elementableAttributes.color } })
  }

  render() {
    const { selection, element } = this.props
    const { selected, colorPicker } = this.state
    if (Object.keys(selected).length === 0 || !element) {
      return (
        <div className={styles.designTools}>
          <span className={styles.nothingSelected}>Nothing Selected</span>
        </div>
      )
    }
    return (
      <div className={styles.designTools}>
        <Popover
          id="color_chooser"
          open={colorPicker}
          anchorEl={this.state.anchorEl}
          onClose={() => this.setState({ colorPicker: false })}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
        >
          <SketchPicker
            disableAlpha
            color={this.state.selectedColor}
            onChange={color => {
              this.changeValue('color', color.hex)
              this.setState({ selectedColor: color })
            }}
          />
        </Popover>
        <form
          className={styles.designForm}
          onChange={this.updateStuff}
          // onSubmit={(e) => e.preventDefault()}
        >
          <div className={styles.tools}>
            {/* {selected.elementableType === 'Shape' ? (
              <>
                <span>Width:</span>
                <input type="text" className="input-attr" size={selected.elementableAttributes.width.toString().length + 1} value={selected.elementableAttributes.width} onChange={this.changeValue('width')} />
                <span>Height:</span>
                <input type="text" className="input-attr" size={selected.elementableAttributes.height.toString().length + 1} value={selected.elementableAttributes.height} onChange={this.changeValue('height')} />
              </>
            ) : ''} */}
            {selected.elementableType === 'Text' && (
              <div className={styles.editText}>
                <label for="text">Edit Text</label>
                <textarea
                  name="text"
                  rows={5}
                  size={selected.elementableAttributes.text.length + 1}
                  value={selected.elementableAttributes.text}
                  onChange={this.changeValue('text')}
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
                  {/*    onChange={this.changeValue('color')}*/}
                  {/*  />*/}
                </label>
                <button
                  type="button"
                  onClick={e => {
                    this.setState({ colorPicker: !colorPicker })
                    this.setState({ anchorEl: e.currentTarget })
                  }}
                  className={styles.changeColorButton}
                >
                  Change color
                </button>
                <button type="button" className={styles.deleteBtn} onClick={this.deleteElement}>
                  <SVG src={DeleteIcon} />
                </button>
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
                    onChange={this.changeValue('fontFamily')}
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
                      onChange={this.changeValue('fontSize')}
                    />
                    <div className={styles.fontSizeControl}>
                      <span
                        className={styles.fontSizeBtn}
                        onClick={() =>
                          this.changeValue('fontSize', parseInt(selected.elementableAttributes.fontSize) - 1)
                        }
                      >
                        <SVG src={MinusIcon} />
                      </span>
                      <span
                        className={styles.fontSizeBtn}
                        onClick={() =>
                          this.changeValue('fontSize', parseInt(selected.elementableAttributes.fontSize) + 1)
                        }
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
                          this.changeValue('fontWeight', 400)
                          break
                        default:
                          this.changeValue('fontWeight', 800)
                          break
                      }
                    }}
                  >
                    <SVG src={BoldIcon} />
                  </div>{' '}
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
                          this.changeValue('textTransform', 'uppercase')
                          break
                        default:
                          this.changeValue('textTransform', 'none')
                          break
                      }
                    }}
                  >
                    <SVG src={AaIcon} />
                  </div>{' '}
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
                          this.changeValue('fontStyle', 'none')
                          break
                        default:
                          this.changeValue('fontStyle', 'italic')
                          break
                      }
                    }}
                  >
                    <SVG src={ItalicIcon} />
                  </div>{' '}
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
                          this.changeValue('textDecoration', 'none')
                          break
                        default:
                          this.changeValue('textDecoration', 'underline')
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
                    onChange={this.changeValue('lineHeight')}
                  >
                    {settingsValue.text.spacing.map((item, index) => (
                      <option key={index} value={item}>
                        Spacing: {item}
                      </option>
                    ))}
                  </select>
                  <div className={styles.textAlign}>
                    <button type="button" onClick={() => this.changeValue('textAlign', 'left')}>
                      <SVG src={LeftText} />
                    </button>
                    <button type="button" onClick={() => this.changeValue('textAlign', 'center')}>
                      <SVG src={CenterText} />
                    </button>
                    <button type="button" onClick={() => this.changeValue('textAlign', 'right')}>
                      <SVG src={RightText} />
                    </button>
                  </div>
                </div>
              </div>
            ) : selected.elementableType === 'Image' ? (
              <>
                <span>Width:</span>
                <input
                  type="number"
                  className="input-attr"
                  size={selected.elementableAttributes.width.toString().length + 1}
                  value={selected.elementableAttributes.width}
                  onChange={this.changeValue('width')}
                />
                <span>Height:</span>
                <input
                  type="number"
                  className="input-attr"
                  size={selected.elementableAttributes.height.toString().length + 1}
                  value={selected.elementableAttributes.height}
                  onChange={this.changeValue('height')}
                />
              </>
            ) : (
              ''
            )}
            {/* <span>X:</span>
            <input type="text" className="input-attr" size={selected.posX.toString().length + 1} value={selected.posX} onChange={this.changeValue('posX')} />
            <span>Y:</span>
            <input type="text" className="input-attr" size={selected.posY.toString().length + 1} value={selected.posY} onChange={this.changeValue('posY')} /> */}
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '1.5rem 0' }}>
              <span>Order:</span>
              <input
                type="text"
                className="input-attr"
                size={selected.zIndex.toString().length + 1}
                value={selected.zIndex}
                onChange={this.changeValue('zIndex')}
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
                  onChange={values => this.changeValue('transparency', values[0])}
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
