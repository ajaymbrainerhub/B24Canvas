import React from 'react'

import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Grid,
  Typography,
  Button
} from '@material-ui/core'

function TemplateSellFinalPopup({ isOpen, callback }) {
  return (
    <Dialog open={isOpen} onClose={callback}>
      <DialogContent className="viewDialog-inner">
        <div className="publishSmallBlock">
          <div className="viewDialog-inner__header">
            <DialogTitle className="viewDialog-inner__title">You're all set</DialogTitle>
            <DialogContentText className="viewDialog-inner__subtitle">
              Your template is ready and published for sale, you will see the updates on seller dashboard
            </DialogContentText>
          </div>
          <div className="mainPublishImage">
            <img src="https://b24chat.com/uploads/cloud/260/barel@purpleux.com/Canvas/All%20designs/139.png" />
            <Typography>12$</Typography>
          </div>
        </div>
      </DialogContent>
      <DialogActions className="viewDialog-footer">
        <Button onClick={callback}>Finish</Button>
      </DialogActions>
    </Dialog>
  )
}

export default TemplateSellFinalPopup
