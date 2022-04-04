import * as React from 'react'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { useState } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { createFolder } from '../../../actions/folder_actions'

function CreateFolder(props) {
  const { toggleModal } = props

  const [folderName, setFolderName] = useState('')

  const onSubmit = () => {
    const { action, folder, currentUser } = props
    action({ id: folder.id, name: folderName }, currentUser?.email, () => toggleModal(false))
  }

  return (
    <Dialog open={true}>
      <DialogTitle>
        <p>
          <b>Create a new folder</b>
        </p>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <input
              style={{ backgroundColor: '#efefef', padding: '0.5rem', borderRadius: '15px', marginBottom: '10px' }}
              type="text"
              name="folder"
              placeholder="Folder name"
              onChange={e => setFolderName(e.target.value)}
            ></input>
          </Grid>
          <Grid item xs={6}>
            <Button
              sx={{
                color: 'black',
                borderColor: 'silver',
                borderRadius: '10px',
                height: '3rem'
              }}
              onClick={() => toggleModal(false)}
              variant="outlined"
              fullWidth
            >
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              onClick={onSubmit}
              sx={{
                backgroundColor: '#1e75ff',
                borderRadius: '10px',
                height: '3rem'
              }}
              fullWidth
              variant="contained"
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

const mapStateToProps = (state, ownProps) => ({
  currentUser: state.entities.users[state.session.id],
  toggleModal: ownProps.toggleModal,
  folder: { name: '' }
})

const mapDispatchToProps = dispatch => ({
  action: (folder, email, success) => dispatch(createFolder(folder, email, success))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreateFolder))
