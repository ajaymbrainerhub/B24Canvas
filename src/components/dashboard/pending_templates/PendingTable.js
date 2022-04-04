import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableContainer, TablePagination, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import EnhancedTableToolbar from './TableToolbar'
import EnhancedTableHead from './TableHead'
import TemplatePopup from './TemplatePopup'
import { getComparator, stableSort } from '../utils'
import PendingTableRow from './PendingTableRow'

const useStyles = makeStyles(theme => ({
  root: {
    padding: '15px'
  },
  paper: {
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

function EnhancedTable(props) {
  const templatesProps = props.templates ? props.templates : []
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('calories')
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [templates, setTemplates] = useState(templatesProps)
  const [selectedTemplate, setSelectedTemplate] = useState({})
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  useEffect(() => {
    setTemplates(templatesProps)
  }, [templatesProps])

  const classes = useStyles()

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

  const handlePopupOpen = template => {
    setSelectedTemplate(template)
    setIsPopupOpen(true)
  }

  const handleUpdateTemplateStatus = (id, status) => {
    setTemplates(prevState => prevState.map(template => (template.id === id ? { ...template, status } : template)))
    setIsPopupOpen(false)
  }

  const handleDeleteTemplate = id => {
    setTemplates(prevState => prevState.filter(template => template.id !== id))
    setIsPopupOpen(false)
  }

  const isSelected = name => selected.indexOf(name) !== -1

  return (
    <>
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
                rowCount={templates.length}
              />
              <TableBody>
                {stableSort(templates, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((template, index) => {
                    const isItemSelected = isSelected(template.id)
                    const labelId = `enhanced-table-checkbox-${index}`

                    return (
                      <PendingTableRow
                        update={props.update}
                        template={template}
                        creatorId={template.creatorId}
                        handleClick={handleClick}
                        labelId={labelId}
                        isItemSelected={isItemSelected}
                        handlePopupOpen={handlePopupOpen}
                      />
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={templates.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
      <TemplatePopup
        isOpen={isPopupOpen}
        template={selectedTemplate}
        creatorId={selectedTemplate.creatorId}
        updateStatusCallback={handleUpdateTemplateStatus}
        closeCallback={() => setIsPopupOpen(false)}
        deleteCallback={handleDeleteTemplate}
        update={props.update}
      />
    </>
  )
}
export default EnhancedTable
