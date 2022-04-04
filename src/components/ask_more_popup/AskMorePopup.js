import React, { useState } from 'react'

import { Button, Dialog, DialogContent, TextField, Typography } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

import styles from './AskMorePopup.module.css'

const options = ['Barber', 'Construction', 'Events', 'Fitness', 'Food ', 'Lawyer', 'Nails', 'Real state']

function AskMorePopup({ isOpen, closeCallback }) {
  const [name, setName] = useState('')
  const [categories, setCategories] = useState([])
  return (
    <Dialog open={isOpen} onClose={closeCallback} className="AskMoreModelBox">
      <div className={styles.AskMoreModel}>
        <DialogContent>
          <div className={styles.AskMoreModelInner}>
            <Typography className={styles.AskMoreModelTitle}>Few more details</Typography>
            <TextField
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="What is your name?"
              className={styles.AskMoreModelInput}
            />
            <div className={styles.AskMoreModelInput}>
              <Autocomplete
                multiple
                id="categories"
                options={options}
                getOptionLabel={option => option}
                value={categories}
                renderInput={params => <TextField {...params} variant="standard" placeholder="Categories" />}
                onChange={(event, newValue) => {
                  setCategories([...newValue])
                }}
              />
            </div>
            <Button onClick={closeCallback} className={styles.bluebtn}>
              Next
            </Button>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  )
}

export default AskMorePopup
