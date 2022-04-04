import React from 'react'
import PropTypes from 'prop-types'
import { TableHead, TableRow, TableSortLabel, TableCell, Checkbox } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const headCells = [
  { id: 'orderid', numeric: false, disablePadding: false, label: 'Order ID' },
  { id: 'dateapplied', numeric: false, disablePadding: false, label: 'Date Applied' },
  { id: 'username', numeric: false, disablePadding: false, label: 'User name' },
  { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
  { id: 'position', numeric: false, disablePadding: false, label: 'Position' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' }
]

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props

  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <StyledTableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </StyledTableCell>
        {headCells.map(headCell => (
          <StyledTableCell
            key={headCell.id}
            align={'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
}

const StyledTableCell = withStyles(theme => ({
  head: {
    fontSize: 14
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

export default EnhancedTableHead
