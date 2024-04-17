import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  triggerRow: {
    cursor: 'pointer',
    userSelect: 'none',

    '&.is-active > td': {
      backgroundColor: '#f1f1f1',

      '&::after': {
        opacity: 1,
        borderBottom: 'none',
      },
    },

    '&:hover svg path': {
      fill: '#2158F5',
    },
  },
  detailsRowTableCell: {
    backgroundColor: '#E6E6E6',
    pointerEvents: 'none',
    padding: [[22, 25, 25]],

    '&::after': {
      content: '""',
      opacity: 1,
      width: '100%',
      height: 'calc(100% + 1px)',
      position: 'absolute',
      top: -1,
      left: 0,
      border: '2px solid #2158F5',
      borderTop: 'none',
    },
  },
  chevron: {
    transition: 'all .2s ease',

    '&.is-active': {
      fill: '#2158F5',
      transform: 'rotate(90deg)',
    },

    '& path': {
      transition: 'all .2s ease',
    },
  },
  subTableRow: {
    borderTop: 'none !important',

    '&:first-child > td': {
      paddingTop: '15px !important',
    },

    '&:last-child > td': {
      paddingBottom: '15px !important',
    },
  },
  subTableCell: {
    padding: '5px 15px 0 24px !important',
    fontSize: 14,
    lineHeight: '20px',
  },
  subTableSummary: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 170,
    paddingTop: 7,
    marginTop: 4,
    marginLeft: 'auto',
    borderTop: '1px solid #B9B9B9',
  },
}));
