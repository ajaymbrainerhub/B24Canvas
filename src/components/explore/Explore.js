import React, { useState, useEffect } from 'react'
import { Card, Chip, Grid, Button } from '@material-ui/core'
import { CheckCircle } from '@material-ui/icons'
import DesignPopup from './DesignPopup'
import ConfirmDesignPopup from './ConfirmDesignPopup'
import TemplateSuccessPopup from '../template_success_popup/TemplateSuccessPopup'
import { connect } from 'react-redux'
import styles from './Explore.module.css'
import { ScrollingCarousel } from '@trendyol-js/react-carousel'
import { requestTemplates, createDesign } from '../../actions/design_actions'
import { withRouter } from 'react-router'
import categories from '../../assets/data/categories'

const creator = {
  name: 'John Joe',
  profilePic: 'fsdfsdf'
}

function Explore({ templatesProps, getTemplates, createDesign, currentUser, history, location, search }) {
  const [isDesignPopupOpen, setIsDesignPopupOpen] = useState(false)
  const [isConfirmDesignPopupOpen, setIsConfirmDesignPopupOpen] = useState(false)
  const [isTemplateSuccessPopupOpen, setIsTemplateSuccessPopupOpen] = useState(false)
  const [selectedDesign, setSelectedDesign] = useState(null)
  const [category, setCategory] = useState(null)

  const [templates, setTemplates] = useState(templatesProps ? templatesProps : [])

  useEffect(() => {
    getTemplates()
  }, [])

  useEffect(() => {
    setTemplates(templates => templatesProps.filter(t => (search ? t.title == search : t)))
  }, [search])

  const createDesignFromTemplate = template => {
    const dimensions = location.item?.dimensions

    const newDesign = {
      ...template,
      creatorId: currentUser.id,
      public:null,
      title: `Untitled Design - ${template.title}`,
      category: '',
      description: template?.description,
      isPublic: false,
      isTemplate: false,
      height: dimensions ? dimensions[1] : template.height,
      width: dimensions ? dimensions[0] : template.width
    }

    delete newDesign.id

    createDesign(newDesign).then(res => history.push(`/design/${res.payload.data.result.designs.id}`))
  }

  const handleDesignSelected = design => {
    setSelectedDesign(design)
    setIsDesignPopupOpen(true)
  }

  const designPopupCloseCallback = () => {
    setIsDesignPopupOpen(false)
  }

  const designPopupBuyCallback = () => {
    setIsDesignPopupOpen(false)
    setIsConfirmDesignPopupOpen(true)
  }

  const confirmDesignPopupCloseCallback = () => {
    setIsConfirmDesignPopupOpen(false)
  }

  const confirmDesignPopupPayCallback = () => {
    setIsConfirmDesignPopupOpen(false)
    setIsTemplateSuccessPopupOpen(true)
  }

  const designPurchasedCloseCallback = () => setIsTemplateSuccessPopupOpen(false)

  const confirmDesignActionBtn = (
    <Button onClick={confirmDesignPopupPayCallback} className={styles.bluebtn}>
      Pay Now
    </Button>
  )

  const templatePurchasedActionBtns = [<Button>Edit Now</Button>, <Button>Go to Home</Button>]

  return (
    <>
      {/* categories section */}
      <div className={styles.categoriesRow}>
        <ScrollingCarousel>
          {categories.map((category, idx) => (
            <Chip
              key={idx}
              clickable={true}
              onClick={() => setCategory(category.name)}
              label={category.name}
              style={{ backgroundColor: category.backgroundColor, color: category.color }}
              className={styles.categoriesChip}
            />
          ))}
        </ScrollingCarousel>
      </div>

      {/* designs section */}
      <Grid container justifyContent="flex-start" className={styles.exploreCards}>
        {templates
          .filter(template => (category ? template.category.split('&').includes(category) : template))
          .map(template => (
            <Grid item key={template.id} className={styles.exploreCardsBlock}>
              <Card className={styles.designWrapper} onClick={() => handleDesignSelected(template)}>
                <img
                  src={encodeURI(
                    `${process.env.REACT_APP_MEDIA_URL}/cloud/${process.env.REACT_APP_BOT_ID}/${template?.email}/Canvas/All designs/${template.id}.png`
                  )}
                  alt={template.title}
                />
              </Card>
            </Grid>
          ))}
      </Grid>

      <DesignPopup
        isOpen={isDesignPopupOpen}
        designInfo={selectedDesign}
        creatorInfo={creator}
        creatorId={selectedDesign ? selectedDesign.creatorId : null}
        closeCalback={designPopupCloseCallback}
        actionButton={
          selectedDesign?.isPaid ? (
            <Button variant="contained" onClick={designPopupBuyCallback} className={styles.bluebtn}>
              Buy Design
            </Button>
          ) : (
            <Button
              variant="contained"
              className={styles.bluebtn}
              onClick={() => createDesignFromTemplate(selectedDesign)}
            >
              Start Design
            </Button>
          )
        }
      />
      <ConfirmDesignPopup
        title="Confirm Order"
        isOpen={isConfirmDesignPopupOpen}
        designInfo={selectedDesign}
        creatorInfo={creator}
        closeCallback={confirmDesignPopupCloseCallback}
        actionButton={confirmDesignActionBtn}
      />
      <TemplateSuccessPopup
        isOpen={isTemplateSuccessPopupOpen}
        title="Your Template is successfully purchased"
        subTitle="Now you can edit and publish the template from your templates"
        headerIcon={<CheckCircle className={styles.successCardHeaderIcon} />}
        actionButtons={templatePurchasedActionBtns}
        callback={designPurchasedCloseCallback}
      />
    </>
  )
}

export default connect(
  state => {
    const templates = Object.values(state.entities.templates).filter(t => t.public)
    return {
      //templatesProps: templates.filter(template => !template.trash && template.isPublic),
      templatesProps: templates,
      currentUser: state.entities.users[state.session.id],
      search: state.ui.searchbar
    }
  },
  dispatch => ({
    getTemplates: () => dispatch(requestTemplates('?withoutSession=true')),
    createDesign: design => dispatch(createDesign(design))
  })
)(withRouter(Explore))
