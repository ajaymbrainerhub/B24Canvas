import React from 'react'

import {
  Avatar,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Button,
  FormControl,
  TextField,
  Slider
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

const options = ['Barber', 'Construction', 'Events', 'Fitness', 'Food ', 'Lawyer', 'Nails', 'Real state']

function TemplateInfoPopup({ isOpen, callbackClose, callbackPublished }) {
  return (
    <>
      <Dialog open={isOpen} onClose={callbackClose}>
        <DialogContent className="viewDialog-inner">
          <Grid container justifyContent="space-between">
            <Grid item md={12} sm={12} className="viewDialog-inner__header">
              <DialogTitle className="viewDialog-inner__title">Sell Template</DialogTitle>
            </Grid>
            <Grid item md={7} sm={7} className="PublishUser">
              <Typography className="PublishUser__title">User</Typography>
              <Grid container justifyContent="flex-start" alignItems="center" className="PublishUser__box">
                <Grid item size="auto" className="PublishUser__img">
                  <Avatar src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80" />
                </Grid>
                <Grid item className="PublishUser__name">
                  Joh Joe
                </Grid>
              </Grid>

              <div className="PublishUser__form">
                <FormControl fullWidth>
                  <TextField name="title" placeholder="Add a title" />
                </FormControl>
                <FormControl fullWidth>
                  <TextField name="description" placeholder="Tell everyone what is your template about" />
                </FormControl>

                <Autocomplete
                  multiple
                  id="categories"
                  options={options}
                  className="PublishUser__select-input"
                  getOptionLabel={option => option}
                  renderInput={params => <TextField {...params} variant="standard" placeholder="Categories" />}
                />

                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                  className="PublishUser__slider-input"
                >
                  <Grid item md={2} sm={2}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item md={8} sm={8}>
                    <Slider aria-label="Price" />
                  </Grid>
                  <Grid item md={2} sm={2}>
                    <Typography className="text-right">12$</Typography>
                  </Grid>
                </Grid>
              </div>
              <DialogActions className="viewDialog-footer viewDialog-footer--small">
                <Button onClick={() => callbackClose(false)}>Back to Templates</Button>
                <Button onClick={callbackPublished}>Publish and Sell</Button>
              </DialogActions>
            </Grid>
            <Grid item md={4} sm={4} className="previewImage">
              <img src="https://b24chat.com/uploads/cloud/260/barel@purpleux.com/Canvas/All%20designs/139.png" />
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default TemplateInfoPopup
