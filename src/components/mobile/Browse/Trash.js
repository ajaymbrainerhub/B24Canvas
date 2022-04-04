import React from 'react'
import { connect } from 'react-redux'
import { requestDesigns } from '../../../actions/design_actions'

import DesignIndexItem from './DesignIndexItem'
import { EmptyTrash } from './Empty'

import styles from '../styles.scss'

class Templates extends React.Component {
  componentDidMount() {
    const { requestDesigns } = this.props
    requestDesigns()
  }

  render() {
    const { templates, currentUser } = this.props
    return (
      <div className="designsContainer">
        <h2>Trash</h2>
        {templates.length ? (
          <>
            {templates.map(design => (
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
          <EmptyTrash />
        )}
      </div>
    )
  }
}

export default connect(
  state => {
    const templates = Object.values(state.entities.designs)
    return {
      currentUser: state.entities.users[state.session.id],
      folder: { name: 'All your designs' },
      templates: templates.filter(design => !design.trash)
    }
  },
  dispatch => ({
    requestDesigns: () => dispatch(requestDesigns(''))
  })
)(Templates)
