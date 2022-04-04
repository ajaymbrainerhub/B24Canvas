import React from 'react'
import { Link } from 'react-router-dom'
import { FiMoreHorizontal } from 'react-icons/fi'
import IndexItemDropdownContainer from './index_item_dropdown_container'
import styles from './DesignIndexItem.module.css'

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
            <Link to={`/design/${design.id}`}>
                <img
                  src={encodeURI(
                    `${process.env.REACT_APP_MEDIA_URL}/cloud/${process.env.REACT_APP_BOT_ID}/${design.email}/Canvas/All designs/${design.id}.png`
                  )}
                  alt=""
                />
            </Link>
        
        <div className={styles.titleBlock}>
         <div className={styles.subTitle}>{`Modified at ${new Date(design?.updatedAt).toLocaleDateString()}`}</div>
       </div>
        
          <div className={styles.wrap}>
            <div className={`${styles.toggle} ${dropdown ? styles.active : ''}`}>
              <button type="button" className="btn-item" onClick={this.toggleDropdown}>
                <FiMoreHorizontal />
              </button>
            </div>
          </div>
       
        {design && dropdown ? (
          <IndexItemDropdownContainer design={design} toggleDropdown={this.toggleDropdown} direction={direction} />
        ) : (
          ''
        )}
        
      </div>
    )
  }
}

export default DesignIndexItem
