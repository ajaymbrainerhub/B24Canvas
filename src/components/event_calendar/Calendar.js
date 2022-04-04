import React, { useState } from 'react'

import { Typography, Grid, Button } from '@material-ui/core'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import { CheckCircle } from '@material-ui/icons'

import TemplatesPopup from '../templates_popup/TemplatesPopup'
import UpcomingPosts from './UpcomingPosts'
import TemplateSuccessPopup from '../template_success_popup/TemplateSuccessPopup'

import styles from './calendar.module.css'
import NavBar from '../NavBar'

const templates = [
  { id: '1', name: 'Template 1', category: 'Food', isForSale: true },
  { id: '2', name: 'Template 2', category: 'Food', isForSale: false },
  { id: '3', name: 'Template 3', category: 'Food', isForSale: true },
  { id: '4', name: 'Template 4', category: 'Food', isForSale: true },
  { id: '5', name: 'Template 5', category: 'Food', isForSale: false },
  { id: '6', name: 'Template 6', category: 'Food', isForSale: false }
]

const events = [
  {
    id: '123',
    title: 'BirthDay Party',
    start: new Date(),
    end: new Date()
  }
]

const scheduledTemplate = {
  title: 'Untitled',
  type: 'instagram post (1080 x 1080px)',
  schedule: '21/12/2021-10:50'
}

function EventCalendar() {
  const [isTemplatePopup, setIsTemplatePopup] = useState(false)
  const [selectedTemplates, setSelectedTemplates] = useState([])
  const [isPostScheduledOpen, setIsPostScheduledOpen] = useState(false)

  const templatePopupCloseCallback = () => {
    setIsTemplatePopup(false)
  }

  const handleTemplateSelected = template => {
    setSelectedTemplates([...selectedTemplates, template])
  }

  const postScheduledCloseCallback = () => setIsPostScheduledOpen(false)

  const handleTemplateSubmitted = () => {
    setIsTemplatePopup(false)
    setIsPostScheduledOpen(true)
  }

  const templatesPopupActionBtns = [
    <Button onClick={templatePopupCloseCallback}>Back to edit</Button>,
    <Button onClick={handleTemplateSubmitted}>Next</Button>
  ]

  const postScheduledActionBtns = [<Button>Edit Now</Button>, <Button>Go to Home</Button>]
  return (
    <>
      <Grid container className="scrollTemplate">
        <Grid item sm={12} xs={12} md={9}>
          <div className={styles.calenderContent}>
            <Typography className={styles.heading}>Content Calendar</Typography>
            <div className="calendertable">
              <FullCalendar
                headerToolbar={{ start: '', center: 'title', end: 'addPost prev next' }}
                plugins={[timeGridPlugin]}
                initialView="timeGridWeek"
                events={events}
                eventMinHeight={100}
                customButtons={{
                  addPost: {
                    text: 'Add Post',
                    click: function () {
                      setIsTemplatePopup(true)
                    }
                  }
                }}
              />
            </div>
          </div>
        </Grid>
        <Grid item sm={12} xs={12} md={3}>
          <UpcomingPosts />
        </Grid>
      </Grid>
      <TemplatesPopup
        title="Pick Templates"
        subTitle="Pick one or more templates to post"
        templates={templates}
        isOpen={isTemplatePopup}
        selectedTemplates={selectedTemplates}
        handleTemplateSelected={handleTemplateSelected}
        callback={templatePopupCloseCallback}
        actionButtons={templatesPopupActionBtns}
      />
      <TemplateSuccessPopup
        title="Your Template is successfully scheduled"
        subTitle="Now you can edit and publish the template from your templates"
        isOpen={isPostScheduledOpen}
        headerIcon={<CheckCircle className={styles.successCardHeaderIcon} />}
        actionButtons={postScheduledActionBtns}
        callback={postScheduledCloseCallback}
      >
        <Grid container className={styles.successCard}>
          <Grid item sm={2} md={2} className={styles.successCardImage}>
            <img
              src="https://www.whatsappprofiledpimages.com/wp-content/uploads/2021/08/Profile-Photo-Wallpaper.jpg"
              alt="Preview"
            />
          </Grid>
          <Grid item sm={9} md={9}>
            <Typography className={styles.successCardTitle}>{scheduledTemplate.title}</Typography>
            <Typography className={styles.successCardType}>{scheduledTemplate.type}</Typography>
            <Typography className={styles.successCardSchedule}>{scheduledTemplate.schedule}</Typography>
          </Grid>
        </Grid>
      </TemplateSuccessPopup>
    </>
  )
}

export default EventCalendar
