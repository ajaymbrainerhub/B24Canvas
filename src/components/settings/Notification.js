import React, { Fragment } from 'react'

import { Typography, Button } from '@material-ui/core'

import NotificationItem from './NotificationItem'

import styles from './Settings.module.css'

const notifications = [
  {
    id: '1',
    title: 'Subject 1',
    description: 'This is the description of subject 1. This is the description of subject 1',
    enabled: true
  },
  {
    id: '2',
    title: 'Subject 2',
    description: 'This is the description of subject 2. This is the description of subject 1',
    enabled: false
  },
  {
    id: '3',
    title: 'Subject 3',
    description: 'This is the description of subject 3. This is the description of subject 1xz',
    enabled: false
  }
]

function Notification() {
  return (
    <div className="Settingstemplate">
      {/* header section */}
      <Typography className={styles.pageHeading}>Notification and Email</Typography>
      <Typography className={styles.pageSubheading}>
        People visiting and following you profile will see the info below
      </Typography>

      {/* notifications section */}
      {notifications.map(({ id, title, description, enabled }) => (
        <Fragment key={id}>
          <NotificationItem title={title} description={description} enabled={enabled} />
        </Fragment>
      ))}

      <Button variant="contained" className="blueBtn">
        Save
      </Button>
    </div>
  )
}

export default Notification
