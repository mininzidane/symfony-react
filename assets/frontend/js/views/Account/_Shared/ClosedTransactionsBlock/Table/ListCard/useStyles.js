import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  listCard: {
    outline: 'none',
    boxShadow: '0 0 6px rgba(0, 0, 0, 0.2) !important',
    backgroundColor: '#ffffff !important',
    wordBreak: 'break-all',

    '&.is-active': {
      backgroundColor: '#f1f1f1 !important',
      boxShadow: '0 0 6px rgba(0, 0, 0, 0.2), 0 0 0 2px #2158F5  !important',
    },
  },
  stateIndicator: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 49,
    paddingTop: 2,
    backgroundColor: '#ffffff',
    borderTop: '1px solid #B9B9B9',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,

    '&.is-active': {
      backgroundColor: '#f2f2f2',

      '& svg': {
        transform: 'scaleY(-1)',
      },

      '& path': {
        fill: '#2158F5',
      },
    },

    '& svg': {
      width: 12,
      height: 8,
    },
  },
  subTable: {
    backgroundColor: '#ffffff',
    borderTop: '1px solid #D4D4D4',
    padding: [[25, 15]],
  },
  subTableRow: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',

    '&:first-child > div': {
      paddingTop: '0 !important',
    },
  },
  subTableCell: {
    paddingTop: '10px !important',
    paddingLeft: '20px !important',
    fontSize: 14,
    lineHeight: '20px',
    textAlign: 'left',

    '&:first-child': {
      paddingLeft: '0 !important',
      whiteSpace: 'nowrap',
    },

    '&:last-child': {
      marginLeft: 'auto',
      whiteSpace: 'nowrap',
    },

    '&:only-child': {
      width: '100%',
    },
  },
  subTableSummary: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 12,
    marginTop: 7,
    marginLeft: 'auto',
    borderTop: '1px solid #B9B9B9',
  },
}));
