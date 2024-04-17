import MuiTableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

const TableCell = withStyles(({ breakpoints }) => ({
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
    background: '#FFFFFF',
    lineHeight: '20px',
    fontSize: 14,
    fontWeight: 700,
    color: '#4F4F4F',
    whiteSpace: 'nowrap',
    paddingRight: 0,

    '&:first-child': {
      paddingLeft: 25,

      [breakpoints.down('md')]: {
        paddingLeft: 15,
      },
    },

    '&:last-child': {
      paddingRight: 25,

      [breakpoints.down('md')]: {
        paddingRight: 15,
      },
    },
  },
  alignRight: {
    paddingRight: 15,
  },
  body: {
    fontSize: 16,
    lineHeight: '20px',
    background: 'white',
    position: 'relative',
    transition: 'background-color .15s ease',

    '&::after': {
      content: '""',
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      borderTop: '2px solid #2158F5',
      borderBottom: '2px solid #2158F5',
      opacity: 0,
      pointerEvents: 'none',
      transition: 'opacity .15s ease',
    },

    '&:first-child': {
      paddingLeft: 25,

      [breakpoints.down('md')]: {
        paddingLeft: 15,
      },

      '&::after': {
        borderLeft: '2px solid #2158F5',
      },
    },

    '&:last-child': {
      paddingRight: 25,

      [breakpoints.down('md')]: {
        paddingRight: 15,
      },

      '&::after': {
        borderRight: '2px solid #2158F5',
      },
    },
  },
}))(MuiTableCell);

export default TableCell;
