import React, { Fragment } from 'react'

import { Button, Typography, Grid } from '@material-ui/core'
import {
  OpenInNew,
  Delete,
  Attachment,
  Edit,
  SubdirectoryArrowRight,
  NearMe,
  CreateNewFolderOutlined
} from '@material-ui/icons'

import EmptyPage from './EmptyPage'
import ActionableTemplateCard from '../actionable_template_card/ActionableTemplateCard'
import styles from './PurchasedTemplates.module.css'

const purchasedTemplates = [
  {
    id: '1',
    image: 'https://thumbs.dreamstime.com/b/rainbow-love-heart-background-red-wood-60045149.jpg',
    title: 'Post 1 facebook',
    editedTime: 'last edited 3 hours ago'
  },
  {
    id: '2',
    image:
      'https://st.depositphotos.com/2577341/3645/i/600/depositphotos_36459665-stock-photo-abstract-watercolor-hand-painted.jpg',
    title: 'Post 1 facebook',
    editedTime: 'last edited 3 hours ago'
  },
  {
    id: '3',
    image: 'https://imgd.aeplcdn.com/1056x594/n/cw/ec/44407/kiger-exterior-right-front-three-quarter-12.jpeg?q=85&wm=1',
    title: 'Post 1 facebook',
    editedTime: 'last edited 3 hours ago'
  },
  {
    id: '4',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNbjmnlzLycPBzci1ZnnWb_nivt8HLtto5DA&usqp=CAU',
    title: 'Post 1 facebook',
    editedTime: 'last edited 3 hours ago'
  },
  {
    id: '5',
    image:
      'https://2.bp.blogspot.com/-B2AIu6n6kTE/XJkQCZVyogI/AAAAAAAAC74/hQbH-HbF0KsLBjAgCdzFguG6aK56KxmGACLcBGAs/s1600/nature%2Bwallpaper%2B4.jpg',
    title: 'Post 1 facebook',
    editedTime: 'last edited 3 hours ago'
  }
]

function PurchasedTemplates({ isShowHeader = false }) {
  const renderPopover = closeMenu => (
    <div className={styles.cardSetList}>
      <Button>
        <OpenInNew className={styles.cardSetListIcon} />
        <Typography>Open</Typography>
      </Button>
      <Button>
        <Attachment className={styles.cardSetListIcon} />
        <Typography>Get shareable link</Typography>
      </Button>
      <Button>
        <SubdirectoryArrowRight className={styles.cardSetListIcon} />
        <Typography>Move</Typography>
      </Button>
      <Button>
        <NearMe className={styles.cardSetListIcon} />
        <Typography>Publish</Typography>
      </Button>
      <Button>
        <Edit className={styles.cardSetListIcon} />
        <Typography>Edit</Typography>
      </Button>
      <Button onClick={() => closeMenu()}>
        <Delete className={styles.cardSetListIcon} />
        <Typography>Delete</Typography>
      </Button>
    </div>
  )

  const renderHeader = () => (
    <Grid container justifyContent="space-between" alignItems="center" className={styles.tamplateHeader}>
      <Grid item>
        <Typography className={styles.pageName}>Purchased Templates</Typography>
      </Grid>
      <Grid item>
        <Button className={styles.pageBtn}>
          Add Folder
          <CreateNewFolderOutlined />
        </Button>
      </Grid>
    </Grid>
  )

  if (!purchasedTemplates.length) {
    return (
      <>
        {isShowHeader ? renderHeader() : null}
        <EmptyPage />
      </>
    )
  }

  return (
    <div className={styles.cardsTemplates}>
      {isShowHeader ? renderHeader() : null}
      <div className={styles.AllCardsBlock}>
        {purchasedTemplates.map(({ id, image, title, editedTime }, idx) => (
          <Fragment key={idx}>
            <ActionableTemplateCard
              id={id}
              image={image}
              title={title}
              subTitle={editedTime}
              render={closeMenu => renderPopover(closeMenu)}
            />
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export default PurchasedTemplates
