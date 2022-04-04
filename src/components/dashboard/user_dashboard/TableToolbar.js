import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles'
import { Toolbar, Typography, IconButton, Tooltip, Select, MenuItem } from '@material-ui/core'
import { FilterList, Delete } from '@material-ui/icons'

function EnhancedTableToolbar(props) {
  const classes = useToolbarStyles()
  const { numSelected } = props

  return (
    <Toolbar
      className={clsx(`${classes.root} ordertableHead`, {
        [classes.highlight]: numSelected > 0
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={'${classes.title} ordertableHead__title'}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={'${classes.title} ordertableHead__title'} variant="h6" id="tableTitle" component="div">
          My Orders
        </Typography>
      )}

      {/* {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <Delete />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterList />
          </IconButton>
        </Tooltip>
      )} */}
      <div className="ordertableHead__filter">
        <Select id="year-selection" value={2021} onChange={e => console.log(e.target.value)}>
          <MenuItem value={2021}>2021</MenuItem>
          <MenuItem value={2020}>2020</MenuItem>
        </Select>
        <Select id="sorting" value="newest" onChange={e => console.log(e.target.value)}>
          <MenuItem value="newest">newest</MenuItem>
          <MenuItem value="oldest">oldest</MenuItem>
        </Select>
      </div>
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired
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

export default EnhancedTableToolbar
