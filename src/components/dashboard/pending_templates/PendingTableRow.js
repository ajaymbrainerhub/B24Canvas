import React, { useState, useEffect } from 'react'
import {
  Table,
  Chip,
  TableBody,
  TableContainer,
  Typography,
  TableCell,
  TablePagination,
  TableRow,
  Paper,
  Checkbox
} from '@material-ui/core'
import EnhancedTableCell from './TableCell'
import { getUserById } from '../../../actions/session_actions'
import { connect } from 'react-redux'
import { makeStyles, withStyles } from '@material-ui/core/styles'

function Status({ template, update, handlePopupOpen, admin}) {
  if (template.public === null) {
    return (
      <div className="buttonRow" style={{alignItems:'center'}}>
        {admin && <button role="button" className="red" onClick={() => update({ ...template, public: false, isPublic: false })}>
          Decline
        </button>
        }
        {admin && <button role="button" className="green" onClick={() => update({ ...template, public: true, isPublic: true })}>
          Approve
        </button>
        }

        {!admin && <Chip label='Pending' />}

        {admin && 
        <button 
        role="button" 
        className="white" 
        onClick={() => handlePopupOpen(template)}>
          View
        </button>}
      </div>
    )
  }
  return (
    
      <div className="buttonRow" style={{ alignItems: 'center' }}>
        <Chip label={template.public ? 'Approved' : 'Rejected'} />
        {admin && 
        <button role="button" 
        className="white" 
        onClick={() => handlePopupOpen(template)}>
          View
        </button>}
      </div>
    
  )
}

function PendingTableRow({
  update,
  GetUser,
  creator,
  creatorId,
  handleClick,
  labelId,
  isItemSelected,
  handlePopupOpen,
  template,
  currentUser
}) {
  useEffect(() => {
    GetUser(creatorId)
  }, [])

  return (
    <TableRow
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={template.id}
      selected={isItemSelected}
      style={{
        background: template.isPublic === false ? '#E4EFF5' : template.isPublic === true ? '#F5F5F5' : '#F5E4E4'
      }}
    >
      <EnhancedTableCell padding="checkbox">
        <Checkbox
          checked={isItemSelected}
          onClick={event => handleClick(event, template.id)}
          inputProps={{ 'aria-labelledby': labelId }}
        />
      </EnhancedTableCell>
      <EnhancedTableCell align="left">
        <img
          className="custImg"
          src={encodeURI(
            `${process.env.REACT_APP_MEDIA_URL}/cloud/${process.env.REACT_APP_BOT_ID}/${template?.email}/Canvas/All designs/${template.id}.png`
          )}
          alt={template.title}
        />
      </EnhancedTableCell>
      <EnhancedTableCell component="th" id={labelId} scope="row" padding="none">
        {creator?.firstName}
      </EnhancedTableCell>
      <EnhancedTableCell align="left">#{template.id}</EnhancedTableCell>
      <EnhancedTableCell align="left">{template.title}</EnhancedTableCell>
      <EnhancedTableCell align="left">{template.isTemplate ? 'Template' : 'Other'}</EnhancedTableCell>
      <EnhancedTableCell align="left">
        {template.category && (
          <div className="tags">
            {template.category.split('&') &&
              template.category.split('&').length &&
              template.category.split('&').map((item, key) => (
                <div key={key} className="tag">
                  {item}
                </div>
              ))}
          </div>
        )}
      </EnhancedTableCell>
      <EnhancedTableCell align="left">
        <Status 
        template={template} 
        update={update} 
        handlePopupOpen={handlePopupOpen}
        admin={currentUser.firstName === 'Admin' ? true : false}
         />
      </EnhancedTableCell>
    </TableRow>
  )
}

const StyledTableCell = withStyles(theme => ({
  head: {
    fontSize: 14
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

export default connect(
  (state, ownProps) => {
    return {
      creator: state.entities.users[ownProps.creatorId],
      currentUser: state.entities.users[state.session.id]
    }
  },
  dispatch => ({
    GetUser: id => dispatch(getUserById(id))
  })
)(PendingTableRow)
