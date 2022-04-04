import React from 'react'
import { Link } from 'react-router-dom'
import { FiMoreHorizontal, FiEye } from 'react-icons/fi'

import IndexItemDropdownContainer from '../../browse/index_item_dropdown_container'
import ImageDropdownContainer from '../../browse/image/upload_dropdown_container'

import transparentImage from '../../../assets/png/transparent.png'
import styles from './DesignIndexItem.module.css'

// eslint-disable-next-line react/prefer-stateless-function
class DesignIndexItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = { dropdown: false, direction: true }
    this.setWrapperRef = this.setWrapperRef.bind(this)
    this.toggleDropdown = this.toggleDropdown.bind(this)
    this.handleClickOutside = this.handleClickOutside.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside)
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside)
  }

  setWrapperRef(node) {
    this.wrapperRef = node
  }

  toggleDropdown(event) {
    const { dropdown } = this.state
    this.setState({ dropdown: !dropdown, direction: event.clientX < 574 })
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ dropdown: false })
    }
  }

  render() {
    const { design, image, temp, toggleModal, currentUser } = this.props
    const { dropdown, direction } = this.state
    return (
      <div className={styles.card} ref={this.setWrapperRef}>
        <div className={styles.thumb}>
          {design ? (
            <Link to={`/design/${design.id}`}>
              <div className={styles.imageBorder}>
                <img
                  src={encodeURI(
                    `${process.env.REACT_APP_MEDIA_URL}/cloud/${process.env.REACT_APP_BOT_ID}/${currentUser?.email}/Canvas/All designs/${design.id}.png`
                  )}
                  alt=""
                />
              </div>
              {design && design.category ? <div>{design.category}</div> : ''}
              {design && design.isPublic ? <div className={styles.public}>Public</div> : ''}
              {design && design.isTemplate ? <div className={styles.template}>Template</div> : ''}
            </Link>
          ) : (
            <div
              className={styles.imageBorder}
              onClick={() => !temp && toggleModal(image.id)}
              style={{ backgroundImage: `url(${transparentImage})` }}
            >
              <img src={image.url} className={temp && styles.tempImg} alt="" />
            </div>
          )}
        </div>
        <div className={styles.titleBlock}>
          <div className={styles.title}>
            {design && design.public ? <FiEye /> : ''}
            {design ? design.title : image.title}
          </div>
          <div className={styles.subTitle}>{design?.lastUsed ?? 'Last edited 3 hours ago'}</div>
        </div>
        {temp ? (
          <div className={styles.loaderWrap}>
            <div className={styles.loader} />
          </div>
        ) : (
          <div className={styles.wrap}>
            <div className={`${styles.toggle} ${dropdown ? styles.active : ''}`}>
              <button type="button" className="btn-item" onClick={this.toggleDropdown}>
                <FiMoreHorizontal />
              </button>
            </div>
          </div>
        )}
        {design && dropdown ? (
          <IndexItemDropdownContainer design={design} toggleDropdown={this.toggleDropdown} direction={direction} />
        ) : (
          ''
        )}
        {image && dropdown ? (
          <ImageDropdownContainer image={image} toggleDropdown={this.toggleDropdown} direction={direction} />
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default DesignIndexItem
