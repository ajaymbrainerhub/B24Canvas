import React from 'react'
import { connect } from 'react-redux'
import { requestDesigns } from '../../../actions/design_actions'

import DesignIndexItem from './DesignIndexItem'
import { toFilter } from './Templates'

import styles from '../styles.scss'

class MyDesigns extends React.Component {
  componentDidMount() {
    const { requestDesigns, currentUser } = this.props
    requestDesigns(currentUser?.email)
  }

  render() {
    const { myDesigns, currentUser, searchKey } = this.props
    return (
      <div className="designsContainer">
        <h2>My Designs</h2>
        {myDesigns.length ? (
          <>
            {myDesigns
              .filter(t => toFilter(t, searchKey))
              .map(design => (
                <div
                  className="design"
                  key={design.id}
                  style={{
                    flexGrow: 230,
                    flexBasis: 230
                  }}
                >
                  <i style={{ paddingBottom: `${(design.height / design.width) * 100.0}%` }} />
                  <DesignIndexItem design={design} currentUser={currentUser} />
                </div>
              ))}
          </>
        ) : (
          <span>Nothing is found</span>
        )}
      </div>
    )
  }
}

export default connect(
  state => {
    const myDesigns = Object.values(state.entities.designs)
    return {
      currentUser: state.entities.users[state.session.id],
      folder: { name: 'All your designs' },
      myDesigns: myDesigns.filter(design => !design.trash)
    }
  },
  dispatch => ({
    requestDesigns: () => dispatch(requestDesigns())
  })
)(MyDesigns)
