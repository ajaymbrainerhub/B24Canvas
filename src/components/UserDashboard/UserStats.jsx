import React from 'react'
import { Box } from '@mui/system'
import Typography from '@mui/material/Typography'

import styles from './UserStats.module.css'

export default function UserStats() {
  return (
    <Box className={styles.userStatsBar} sx={{ border: 1, borderColor: 'grey.500', borderRadius: 3 }}>
      <div className={styles.data}>
        <Typography variant="h6" color="text.secondary">
          Profile viewed
        </Typography>

        <Typography variant="h5" color="text.primary">
          500
        </Typography>
      </div>
      <div className={styles.data}>
        <Typography variant="h6" color="text.secondary">
          Net Income
        </Typography>

        <Typography variant="h5" color="text.primary">
          500
        </Typography>
      </div>
      <div className={styles.data}>
        <Typography variant="h6" color="text.secondary">
          Withdrawn
        </Typography>

        <Typography variant="h5" color="text.primary">
          500
        </Typography>
      </div>
      <div className={styles.data}>
        <Typography variant="h6" color="text.secondary">
          Used for purchase
        </Typography>

        <Typography variant="h5" color="text.primary">
          500
        </Typography>
      </div>
      <div className={styles.data}>
        <Typography variant="h6" color="text.secondary">
          Used for purchase
        </Typography>

        <Typography variant="h5" color="text.primary">
          500
        </Typography>
      </div>
      <div className={styles.data}>
        <Typography variant="h6" color="text.secondary">
          Used for purchase
        </Typography>

        <Typography variant="h5" color="text.primary">
          500
        </Typography>
      </div>
    </Box>
  )
}
