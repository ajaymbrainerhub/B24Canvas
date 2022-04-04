import React from 'react'
import PropTypes from 'prop-types'

import { TableRow, TableHead, TableSortLabel, Checkbox } from '@material-ui/core'

import EnhancedTableCell from './TableCell'

const headCells = [
  { id: 'img', numeric: false, disablePadding: true, label: 'Template' },
  { id: 'name', numeric: false, disablePadding: true, label: 'Customer' },
  { id: 'id', numeric: true, disablePadding: false, label: 'Template ID' },
  { id: 'tempName', numeric: true, disablePadding: false, label: 'Template name' },
  { id: 'category', numeric: false, disablePadding: false, label: 'Category' },
  { id: 'tags', numeric: true, disablePadding: false, label: 'Tags' },
  { id: 'options', numeric: true, disablePadding: false, label: 'Options' }
]

function EnhancedTableHead({ classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort }) {
  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <EnhancedTableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </EnhancedTableCell>
        {headCells.map(headCell => (
          <EnhancedTableCell
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
          </EnhancedTableCell>
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

export default EnhancedTableHead
