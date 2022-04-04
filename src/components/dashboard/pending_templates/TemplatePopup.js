import { Button, Dialog, Grid, DialogContent, DialogActions, Avatar, Typography, Chip } from '@material-ui/core'
import { DeleteOutline } from '@material-ui/icons'
import React, { useEffect } from 'react'
import { getUserById } from '../../../actions/session_actions'
import { deleteDesign } from '../../../actions/design_actions'

import { connect } from 'react-redux'

function TemplatePopup({
  isOpen,
  creatorId,
  GetUser,
  update,
  template,
  creator,
  updateStatusCallback,
  deleteCallback,
  closeCallback,
  DeleteDesign
}) {
  useEffect(() => {
    GetUser(creatorId)
  }, [])

  return (
    <Dialog open={isOpen} onClose={closeCallback}>
      <DialogContent className="pendingTemplateView">
        {/* header section */}
        <Grid container justifyContent="space-between" alignItems="center" className="pendingTemplateTopBtns">
          <Grid item>
            <Button onClick={() => DeleteDesign(template.id,template.email)}>
              <DeleteOutline /> Delete
            </Button>
          </Grid>
          <Grid item>
            <Button>Edit Template</Button>
          </Grid>
        </Grid>

        <Grid container justifyContent="space-between">
          {/* preview section */}
          <Grid item md="4" sm="4" className="previewImage">
            <img
              src={encodeURI(
                `${process.env.REACT_APP_MEDIA_URL}/cloud/${process.env.REACT_APP_BOT_ID}/${template?.email}/Canvas/All designs/${template.id}.png`
              )}
              alt={template.title}
            />
          </Grid>

          {/* template details section */}
          <Grid item md="7" sm="7">
            <Grid container alignItems="center" className="auther">
              <Avatar src={`${process.env.REACT_APP_MEDIA_URL}/${creator?.avatar}`} />
              <Typography className="autherName">{creator?.firstName}</Typography>
            </Grid>

            <Typography className="pendingTemplateName">{template.title}</Typography>
            <Typography className="pendingTemplateText">{template.description}</Typography>
            <div className="templateChips">
              {template.category &&
                template.category.split('&') &&
                template.category.split('&').length &&
                template.category.split('&').map((item, key) => <Chip label={item} />)}
            </div>

            <DialogActions className="pendingTemplateFooter">
              <Button onClick={() => update({ ...template, public: false, isPublic: false })}>Decline Template</Button>
              <Button onClick={() => update({ ...template, public: true, isPublic: true })}>Approve Template</Button>
            </DialogActions>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default connect(
  (state, ownProps) => {
    return {
      creator: state.entities.users[ownProps.creatorId]
    }
  },
  dispatch => ({
    GetUser: id => dispatch(getUserById(id)),
    DeleteDesign: (designId, currentUser) => dispatch(deleteDesign(designId, currentUser))
  })
)(TemplatePopup)
