import React, { useEffect, useState } from 'react'
import { ScrollingCarousel } from '@trendyol-js/react-carousel'
import SVG from 'react-inlinesvg'
import cx from 'classnames'
import { connect } from 'react-redux'
import Gallery from './Gallery'
import { requestTemplates } from '../../actions/design_actions'
import { SearchIcon } from '../../assets/svg'
import types from '../../assets/jpg/types'
import styles from './NavBar.module.css'
import AskMorePopup from '../ask_more_popup/AskMorePopup'
import { Link } from 'react-router-dom'

function Index(props) {
  const { getTemplates, designs } = props
  const [search, setSearch] = useState('')
  const [tags, setTags] = useState([])
  const [platform, setPlatform] = useState('all')
  const [platformDimensions, setPlatformDimensions] = useState([])
  const [showModal, setModal] = useState(false)
  const [showAskMore, setShowAskMore] = useState(false)

  useEffect(() => {
    getTemplates()
  }, [])

  // function setTag(tag) {
  //   if (Array.isArray(tag)) {
  //     let newTags = tags
  //     tag.forEach(item => {
  //       const finded = tags.find(itm => itm === item)
  //       if (finded) {
  //         newTags = newTags.filter(itm => itm !== item)
  //       } else {
  //         newTags = [...newTags, item]
  //       }
  //     })
  //     setTags(newTags)
  //   } else {
  //     if (tags.indexOf(tag)) {
  //       const newTags = tags.filter(item => item !== tag)
  //       setTags(newTags)
  //     } else {
  //       setTags([...tags, tag])
  //     }
  //   }
  // }

  // function tagIsActive(tag) {
  //   if (Array.isArray(tag)) {
  //     let answer = false
  //     tag.forEach(item => {
  //       const founded = tags.find(itm => itm === item)
  //       if (founded) {
  //         answer = true
  //       }
  //     })
  //     if (answer) {
  //       return styles.categoryActive
  //     } else {
  //       return null
  //     }
  //   } else {
  //     if (tags.indexOf(tag)) {
  //       return styles.categoryActive
  //     } else {
  //       return null
  //     }
  //   }
  // }

  function displayTypes() {
    
    switch (platform) {
      case 'all':
        return (
          <GeneratedTabs
            platformDimensions={platformDimensions}
            setPlatformDimensions={setPlatformDimensions}
            types={types}
          />
        )
        
      default:
        return (
          <GeneratedTabs
            platformDimensions={platformDimensions}
            setPlatformDimensions={setPlatformDimensions}
            types={types.filter(type => type.platform === platform)}
          />
        )
    }
  }

  const platforms = [
    { label: 'All', value: 'all' },
    { label: 'Social', value: 'social' },
    { label: 'Print', value: 'print' },
    { label: 'Digital', value: 'digital' }
  ]

  return (
    <div className="homeTemplate">
      <AskMorePopup isOpen={showAskMore} closeCallback={() => setShowAskMore(false)} />
      <header className={styles.headerBar}>
        <h1>Explore any design</h1>
        <div className={styles.searchBar}>
          <SVG src={SearchIcon} />
          <input
            name="searchbar"
            value={search}
            onChange={e => setSearch(e.currentTarget.value)}
            type="text"
            placeholder="Search. Any design."
          />
        </div>
      </header>
      {/* Types */}
      <div className={styles.container}>
        <div className={styles.advHeading}>
          <h2 className="heading">Pick one platform to design for</h2>
          <ul>
            {platforms.map((item, idx, key) => (
              <li className={item.value === platform ? styles.active : ''}>
                <button role="button" onClick={() => setPlatform(item.value)}>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {displayTypes()}
      </div>

      {/* Templates */}
      <div className={styles.container}>
        <h2 className="heading">Explore endless designs</h2>
        <div className={styles.galleryWrapper}>
          {/* {currentUser && <button className={styles.createDesign} onClick={() => setModal(true)} />}
          {showModal && <CreateCustomTemplate closeModal={() => setModal(false)} />} */}
          <Gallery
            {...props}
            size={platformDimensions}
            elements={tags.length ? designs.filter(design => tags.indexOf(design.category) > -1) || [] : designs}
          />
        </div>
      </div>
    </div>
  )
}

function CalculatedType({ item, active, setPlatformDimensions }) {
  function calcHeight(dimensions) {
    const ratio = dimensions[0] / dimensions[1]
    if (ratio >= 1) {
      return '125px'
    } else {
      return `${125 / ratio}px`
    }
  }
  function calcWidth(dimensions) {
    const ratio = dimensions[0] / dimensions[1]
    if (ratio <= 1) {
      return '125px'
    } else {
      return `${125 * ratio}px`
    }
  }
  return (
    <Link to={{ pathname: '/user/explore', item: item }}>
      <div
        className={cx(styles.typeContainer, active && styles.typeActive)}
        onClick={() => setPlatformDimensions(item)}
      >
        <div className={styles.typeBackground}>
          <div
            className={styles.type}
            style={{
              background: item.background,
              width: calcWidth(item.dimensions),
              height: calcHeight(item.dimensions)
            }}
          >
            <SVG src={item.icon} alt={item.label} className="etxt" />
          </div>
        </div>
        <span>{item.label}</span>
      </div>
    </Link>
  )
}

function GeneratedTabs({ types, platformDimensions, setPlatformDimensions }) {
  return (
    <ScrollingCarousel>
      {types.map((item, key) => (
        <CalculatedType
          item={item}
          key={key}
          active={platformDimensions.id === item.id}
          setPlatformDimensions={setPlatformDimensions}
        />
      ))}
    </ScrollingCarousel>
  )
}

export default connect(
  state => {
    return {
      designs: Object.values(state.entities.templates).filter(t => t.public),
      currentUser: state.entities.users[state.session.id]
    }
  },
  dispatch => ({
    getTemplates: () => dispatch(requestTemplates('?withoutSession=true')),
    createDesign: design => dispatch(createDesign(design))
  })
)(Index)
