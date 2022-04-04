import * as React from 'react'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { requestDesigns } from '../../../actions/design_actions'
import styles from './DesignBrowser.module.css'
import DesignIndexItem from '../DesignIndexItem'
import AllFolders from '../folder/AllFolders'

function DesignList(props) {
  const { designs, currentUser } = props

  return (
    <div className={styles.masonry}>
      {designs.map(design => (
        <DesignIndexItem 
        key={design.id} 
        design={design} 
        currentUser={currentUser} />
      ))}
    </div>
  )
}

function DesignBrowser(props) {
  const [toggleCategory, setToggleCategory] = useState('all')

  const { currentUser, designs } = props

  useEffect(() => {
    const { getDesigns, currentUser } = props
    getDesigns()
  }, [])

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.indexTitle}>Folders</h1>
        <AllFolders setToggleCategory={setToggleCategory} />

        {designs.filter(design=>!design.isTemplate).length !== 0 && (toggleCategory === 'all' || toggleCategory === 'recent') && (
          <div>
            <h2>Recent</h2>
            <DesignList designs={designs.filter(design=>!design.isTemplate)} currentUser={currentUser}></DesignList>
          </div>
        )}

        {designs.filter(design=>false).length !== 0 && (toggleCategory === 'all' || toggleCategory === 'saved') && (
          <div>
            <h2>Saved</h2>
            <DesignList designs={designs.filter(design=>false)} currentUser={currentUser}></DesignList>
          </div>
        )}
        {designs.filter(design=>false).length !== 0 && (toggleCategory === 'all' || toggleCategory === 'purchased') && (
          <div>
            <h2>Purchased</h2>
            <DesignList designs={designs.filter(design=>false)} currentUser={currentUser}></DesignList>
          </div>
        )}
      </div>
    </>
  )
}
export default connect(
  state => {
    const designs = Object.values(state.entities.designs)
    return {
      currentUser: state.entities.users[state.session.id],
      designs: designs.filter(design => !design.trash)
    }
  },
  dispatch => ({
    getDesigns: () => {
      dispatch(requestDesigns(''))
    }
  })
)(DesignBrowser)
