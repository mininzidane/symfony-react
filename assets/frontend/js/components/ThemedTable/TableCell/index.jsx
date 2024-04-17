import MuiTableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const TableCell = withStyles(({ mixins }) => ({
  '@global': {
    '@supports ( -moz-appearance:none )': {
      'table td': {
        backgroundClip: 'padding-box !important',
      },
    },
  },
  root: {
    minHeight: 60,
    padding: [[20, 15]],
    border: 'none',
  },
  head: {
    ...mixins.font(16, 20, 700),
    position: 'relative',
    padding: [[14, 8]],
    minHeight: 48,
    border: 'none',
    backgroundColor: '#E0E0E0',
    color: '#333333',

    '&:hover': {
      backgroundColor: '#F2F2F2',
    },

    '&:not(:first-child)': {
      borderLeft: '1px solid #F1F1F8',
    },

    '&:first-child': {
      paddingLeft: 14,
    },

    '&:last-child': {
      paddingRight: 14,
    },
  },
  alignRight: {
    paddingRight: 14,
  },
  body: {
    ...mixins.font(16, 20),
    position: 'relative',
    padding: [[15, 8]],
    background: 'white',
  },
}))(MuiTableCell);

export default TableCell;
