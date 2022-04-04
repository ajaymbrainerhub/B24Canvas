import React from 'react'
import { connect } from 'react-redux'
import { requestDesigns } from '../../actions/design_actions'
import DesignIndexItem from './DesignIndexItem'
import SVG from 'react-inlinesvg'
import styles from './AllDesigns.module.css'
import { TrashBinIcon } from '../../assets/svg'

class AllDesigns extends React.Component {
  componentDidMount() {
    const { requestDesigns, currentUser } = this.props
    requestDesigns(currentUser?.email)
  }

  render() {
    const { designs, folder, currentUser } = this.props
    if (!folder) return null
    return (
      <>
        <div className={styles.indexArea}>
          <h1 className={styles.indexTitle}>Trash</h1>
          {designs.length === 0 ? (
            <div className={styles.emptyWrapper}>
              <div className={styles.empty}>
                <SVG src={TrashBinIcon} />
                <h2>Trash is empty</h2>
                <span>
                  Any designs you delete will appear here, you have 60 days to restore them before them deleted
                  pemanetly
                </span>
              </div>
            </div>
          ) : (
            <div className={styles.masonry}>
              {designs.map(design => (
                <div
                  key={design.id}
                  className={styles.masonItem}
                  style={{
                    flexGrow: 230,
                    flexBasis: 230
                  }}
                >
                  <i style={{ paddingBottom: `${(design.height / design.width) * 100.0}%` }} />
                  <DesignIndexItem design={design} currentUser={currentUser} />
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    )
  }
}

export default connect(
  state => {
    const designs = Object.values(state.entities.designs)
    return {
      currentUser: state.entities.users[state.session.id],
      folder: { name: 'All your designs' },
      designs: designs.filter(design => !design.trash)
    }
  },
  dispatch => ({
    requestDesigns: () => dispatch(requestDesigns())
  })
)(AllDesigns)
