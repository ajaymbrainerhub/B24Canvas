import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Paper,
  Checkbox,
  IconButton,
  Tooltip,
  Avatar
} from '@material-ui/core'

import DeleteIcon from '@material-ui/icons/Delete'
import FilterListIcon from '@material-ui/icons/FilterList'

const rows = [
  {
    custId: 10,
    id: 110,
    name: 'Watlsaw Gavel',
    date: 12341234,
    location: 'Warsaw, Poland',
    phone: '99189924',
    email: 'watslaw@gavel.pl',
    status: 'pending',
    options: ['ab'],
    img: 'https://thumbs.dreamstime.com/b/proud-office-worker-posing-thumbs-up-proud-office-worker-posing-thumbs-up-looking-camera-121346976.jpg'
  },
  {
    custId: 10,
    id: 111,
    name: 'Watlsaw Gavel',
    date: 12341234,
    location: 'Warsaw, Poland',
    phone: '99189924',
    email: 'watslaw@gavel.pl',
    status: 'pending',
    options: ['ab'],
    img: 'https://thumbs.dreamstime.com/b/proud-office-worker-posing-thumbs-up-proud-office-worker-posing-thumbs-up-looking-camera-121346976.jpg'
  },
  {
    custId: 10,
    id: 112,
    name: 'Watlsaw Gavel',
    date: 12341234,
    location: 'Warsaw, Poland',
    phone: '99189924',
    email: 'watslaw@gavel.pl',
    status: 'pending',
    options: ['ab'],
    img: 'https://thumbs.dreamstime.com/b/proud-office-worker-posing-thumbs-up-proud-office-worker-posing-thumbs-up-looking-camera-121346976.jpg'
  },
  {
    custId: 10,
    id: 113,
    name: 'Watlsaw Gavel',
    date: 12341234,
    location: 'Warsaw, Poland',
    phone: '99189924',
    email: 'watslaw@gavel.pl',
    status: 'pending',
    options: ['ab'],
    img: 'https://thumbs.dreamstime.com/b/proud-office-worker-posing-thumbs-up-proud-office-worker-posing-thumbs-up-looking-camera-121346976.jpg'
  }
]

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(el => el[0])
}

const headCells = [
  { id: 'img', numeric: false, disablePadding: true, label: '' },
  { id: 'name', numeric: false, disablePadding: true, label: 'Customer' },
  { id: 'custId', numeric: true, disablePadding: false, label: 'Customer ID' },
  { id: 'date', numeric: true, disablePadding: false, label: 'Join Date' },
  { id: 'location', numeric: false, disablePadding: false, label: 'Location' },
  { id: 'phone', numeric: true, disablePadding: false, label: 'Phone' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'options', numeric: false, disablePadding: false, label: 'Options' }
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

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  title: {
    flex: '1 1 100%'
  }
}))

const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles()
  const { numSelected } = props

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Customers List
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
}

const useStyles = makeStyles(theme => ({
  root: {
    //width: '100%',
    padding: '15px'
    //border: '1px solid rgba(217, 225, 231, 0.8)',
  },
  paper: {
    //width: '100%',
    borderRadius: 15
  },
  table: {
    minWidth: 750
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

export default function EnhancedTable() {
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
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
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
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.id)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      //onClick={event => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <StyledTableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onClick={event => handleClick(event, row.id)}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <Avatar alt={row.name} src={row.img} />
                      </StyledTableCell>
                      <StyledTableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </StyledTableCell>
                      <StyledTableCell align="left">{row.custId}</StyledTableCell>
                      <StyledTableCell align="left">{row.date}</StyledTableCell>
                      <StyledTableCell align="left">{row.location}</StyledTableCell>
                      <StyledTableCell align="left">{row.phone}</StyledTableCell>
                      <StyledTableCell align="left">{row.email}</StyledTableCell>
                      <StyledTableCell align="left">{row.status}</StyledTableCell>
                      <StyledTableCell align="left">
                        <button role="button" className="default">
                          Order history
                        </button>
                      </StyledTableCell>
                    </TableRow>
                  )
                })}
              {/*{emptyRows > 0 && (*/}
              {/*  <TableRow style={{ height: 33 * emptyRows }}>*/}
              {/*    <TableCell colSpan={6} />*/}
              {/*  </TableRow>*/}
              {/*)}*/}
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
      </Paper>
    </div>
  )
}
