import { withStyles } from '@material-ui/core/styles'
import { TableCell } from '@material-ui/core'

const EnhancedTableCell = withStyles(theme => ({
  head: {
    fontSize: 14
  },
  body: {
    fontSize: 14,
    borderBottom: '10px solid #FFF'
  }
}))(TableCell)

export default EnhancedTableCell
