import React, { Fragment, useCallback, useState } from 'react'

import { Typography, Button, Grid } from '@material-ui/core'
import { MoreHoriz, CreateNewFolderOutlined } from '@material-ui/icons'
import { FiTrash2 } from 'react-icons/fi'
import ActionableTemplateCard from '../../actionable_template_card/ActionableTemplateCard'
import styles from './Uploads.module.css'
import uploadImage from '../../../assets/png/New Project.png'

const uploadedTemplates = [
  {
    id: '1',
    image: 'https://thumbs.dreamstime.com/b/rainbow-love-heart-background-red-wood-60045149.jpg',
    uploadTime: '3 hours ago'
  },
  {
    id: '2',
    image:
      'https://st.depositphotos.com/2577341/3645/i/600/depositphotos_36459665-stock-photo-abstract-watercolor-hand-painted.jpg',
    uploadTime: '4 hours ago'
  },
  {
    id: '3',
    image: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/44407/kiger-exterior-right-front-three-quarter-12.jpeg?q=85&wm=1',
    uploadTime: '4 hours ago'
  },
  {
    id: '4',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNbjmnlzLycPBzci1ZnnWb_nivt8HLtto5DA&usqp=CAU',
    uploadTime: '5 hours ago'
  },
  {
    id: '5',
    image:
      'https://2.bp.blogspot.com/-B2AIu6n6kTE/XJkQCZVyogI/AAAAAAAAC74/hQbH-HbF0KsLBjAgCdzFguG6aK56KxmGACLcBGAs/s1600/nature%2Bwallpaper%2B4.jpg',
    uploadTime: '6 hours ago'
  }
]

function Uploads() {
  const [templates, setTemplates] = useState(uploadedTemplates)

  const handleDeleteTemplate = templteId => {
    setTemplates(prevState => prevState.filter(template => template.id !== templteId))
  }

  const renderHeader = () => (
    <Grid container justifyContent="space-between">
      <Grid item>
        <Typography className={styles.pageName}>Uploads</Typography>
      </Grid>
      <Grid item>
        <Button className={styles.pageBtn}>
          Add Folder
          <CreateNewFolderOutlined />
        </Button>
      </Grid>
    </Grid>
  )

  if (!templates.length) {
    return (
      <div className={styles.centerBox}>
        {renderHeader()}
        <img className={styles.centerBoxImage} alt="Upload img" src={uploadImage} />
        <Typography className={styles.centerBoxTitle}>You didn't upload yet</Typography>
        <Typography className={styles.centerBoxText}>You can drag picture to the screen or</Typography>
        <Button className={styles.grayBtn}>Upload</Button>
      </div>
    )
  }

  return (
    <div className={styles.uploadTemplates}>
      {renderHeader()}
      <div className={styles.uploadsAllCards}>
        {templates.map((template, idx) => (
          <Fragment key={idx}>
            <ActionableTemplateCard
              id={template.id}
              image={template.image}
              title={template.uploadTime}
              render={closeMenu => (
                <Button
                  onClick={() => {
                    handleDeleteTemplate(template.id)
                    closeMenu()
                  }}
                >
                  <FiTrash2 />
                  <Typography>Delete</Typography>
                </Button>
              )}
            />
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default Uploads
