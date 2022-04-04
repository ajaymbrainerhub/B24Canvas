import React, { Fragment } from 'react'

import { Grid, Typography, Button } from '@material-ui/core'

import styles from './calendar.module.css'

const data = [
  {
    date: 'Monday,  8 August 2020',
    posts: [
      {
        title: 'Facebook post',
        startTime: '08:00',
        endTime: '09:00'
      },
      {
        title: 'Facebook post',
        startTime: '10:00',
        endTime: '10:15'
      }
    ]
  },
  {
    date: 'Monday,  9 August 2020',
    posts: [
      {
        title: 'Facebook post',
        startTime: '08:00',
        endTime: '09:00'
      },
      {
        title: 'Facebook post',
        startTime: '10:00',
        endTime: '10:15'
      }
    ]
  }
]

function UpcomingPosts() {
  return (
    <div className={styles.nextPostsWrapper}>
      {/* header section */}
      <Grid container alignItems="center" justifyContent="space-between" className={styles.nextPostsWrapperHead}>
        <Grid item>
          <Typography className={styles.nextPostLabel}>Next posts</Typography>
        </Grid>
        <Grid item>
          <Button>View All</Button>
        </Grid>
      </Grid>

      {/* body section */}
      {data.map(item => (
        <Fragment key={item.date}>
          <Typography className={styles.nextPostsWrapperText}>{item.date}</Typography>
          <div className={styles.postsWrapper}>
            {item.posts.map((post, idx) => (
              <div className={styles.post} key={idx}>
                <Typography className={styles.postTitle}>{post.title}</Typography>
                <Typography>{`${post.startTime}-${post.endTime}`}</Typography>
              </div>
            ))}
          </div>
        </Fragment>
      ))}
    </div>
  )
}

export default UpcomingPosts
