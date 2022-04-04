import React from 'react'
import { connect } from 'react-redux'
import { requestDesigns } from '../../../actions/design_actions'

import DesignIndexItem from './DesignIndexItem'
import Empty from './Empty'

import styles from '../styles.scss'

class Templates extends React.Component {
  componentDidMount() {
    const { requestDesigns } = this.props
    requestDesigns()
  }

  render() {
    const { templates, currentUser, searchKey, showModal } = this.props
    return (
      <div className="designsContainer">
        <h2>Public Templates</h2>
        {templates.length ? (
          <>
            {templates
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
          <Empty showModal={showModal} />
        )}
      </div>
    )
  }
}

function toFilter(template, searchKey) {
  if (template) {
    if (searchKey.length) {
      if (template.name?.indexOf(searchKey) !== 0) {
        return true
      } else if (template.category?.indexOf(searchKey) !== 0) {
        return true
      } else {
        return false
      }
    } else {
      return true
    }
  } else {
    return false
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
    requestDesigns: () => dispatch(requestDesigns(false, true))
  })
)(Templates)

export { toFilter }
