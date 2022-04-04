import React from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
  Avatar,
  Grid,
  Typography
} from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import { getComparator, stableSort } from '../utils'
import EnhancedTableHead from './TableHead'
import EnhancedTableToolbar from './TableToolbar'

const rows = [
  {
    id: '1',
    orderid: '#000123456',
    dateapplied: 'Nov 21th 2020 09:21 AM',
    username: 'Bubbles Studios',
    type: 'Template',
    position: 'user',
    status: 'approved'
  },
  {
    id: '2',
    orderid: '#000123457',
    dateapplied: 'Nov 21th 2020 09:21 AM',
    username: 'Bubbles Studios',
    type: 'Template',
    position: 'user',
    status: 'approved'
  },
  {
    id: '3',
    orderid: '#000123458',
    dateapplied: 'Nov 21th 2020 09:21 AM',
    username: 'Bubbles Studios',
    type: 'Template',
    position: 'user',
    status: 'approved'
  },
  {
    id: '4',
    orderid: '#000123459',
    dateapplied: 'Nov 21th 2020 09:21 AM',
    username: 'Bubbles Studios',
    type: 'Template',
    position: 'user',
    status: 'approved'
  },
  {
    id: '5',
    orderid: '#000123451',
    dateapplied: 'Nov 21th 2020 09:21 AM',
    username: 'Bubbles Studios',
    type: 'Template',
    position: 'user',
    status: 'declined'
  }
]

function OrderTable() {
  const classes = useStyles()
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('calories')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1))
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangeDense = event => {
    setDense(event.target.checked)
  }

  const isSelected = name => selected.indexOf(name) !== -1

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage)

  return (
    <div className={`${classes.root} ordertable`}>
      <EnhancedTableToolbar numSelected={selected.length} />
      <TableContainer style={{ width: '100%' }} className="ordertable__block">
        <Table className={classes.table} aria-labelledby="tableTitle" size="small" aria-label="table">
          <EnhancedTableHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody style={{ width: '100%' }}>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.id)
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <TableRow
                    hover
                    onClick={event => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <StyledTableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        onClick={event => handleClick(event, row.orderid)}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.orderid}</StyledTableCell>
                    <StyledTableCell align="left">{row.dateapplied}</StyledTableCell>
                    <StyledTableCell align="left">
                      <Grid container className="orderName">
                        <Avatar />
                        {row.username}
                      </Grid>
                    </StyledTableCell>
                    <StyledTableCell align="left">{row.type}</StyledTableCell>
                    <StyledTableCell align="left">{row.position}</StyledTableCell>
                    <StyledTableCell align="left">
                      <Typography className="statusOrder">{row.status}</Typography>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <button role="button" className="default">
                        <MoreVert />
                      </button>
                    </StyledTableCell>
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    padding: '15px'
    //border: '1px solid rgba(217, 225, 231, 0.8)',
  },
  table: {
    minWidth: 750,
    width: '100%'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
}))

const StyledTableCell = withStyles(theme => ({
  head: {
    fontSize: 14
  },
  body: {
    fontSize: 14
  }
}))(TableCell)

export default OrderTable
