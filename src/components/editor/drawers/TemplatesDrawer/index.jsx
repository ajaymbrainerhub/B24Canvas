import React from 'react'
import { connect } from 'react-redux'

import { requestDesigns, requestTemplates } from '../../../../actions/design_actions'

import styles from './styles.module.css'
import scrollbar from '../scrollbar.module.css'

class TemplatesDrawer extends React.Component {
  componentDidMount() {
    this.props.getTemplates()
  }

  addElement(elements) {
    const { addElement } = this.props

    if (elements && elements.length) {
      elements.map(element => addElement(element))
    }
  }

  render() {
    const { templates, currentUser } = this.props
    return (
      <>
        <div className={scrollbar.customScroll}>
          <div className={styles.elements}>
            <div className={styles.itemList}>
              {templates.map(template => (
                <div key={template.id} className={styles.item} onClick={() => this.addElement(template.elements)}>
                  <img
                    src={encodeURI(
                      `${process.env.REACT_APP_MEDIA_URL}/cloud/${process.env.REACT_APP_BOT_ID}/${template.email}/Canvas/All designs/${template.id}.png`
                    )}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default connect(
  state => ({
    currentUser: state.entities.users[state.session.id],
    templates: Object.values(state?.entities?.templates) || []
  }),
  dispatch => ({
    getTemplates: () => dispatch(requestTemplates('?withoutSession=true')),
  })
)(TemplatesDrawer)
