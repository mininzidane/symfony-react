import MuiTableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core';

const TableCell = withStyles(() => ({
  root: {
    minHeight: 60,
    borderCollapse: 'separate',
    textIndent: 'initial',
    borderSpacing: '2px',
  },
  head: {
    fontSize: 13,
    color: '#676a6c',
  },
  body: {
    fontSize: 13,
    color: '#676a6c',
    fontWeight: 'inherit',
  },
}))(MuiTableCell);

export default TableCell;
