import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  transactionTabs: {
    marginTop: 6,
    marginBottom: 25,
    backgroundColor: '#F1F1F8',

    [breakpoints.down('sm')]: {
      marginBottom: 20,
    },
  },
  tab: {
    padding: [[4, 0]],
    fontSize: 14,
  },
  tableContainer: {
    border: '1px solid #e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  tableWrap: {
    marginTop: 5,
    marginBottom: 40,

    [breakpoints.down('sm')]: {
      marginBottom: 30,
    },

    '& table': {
      boxShadow: 'none',
    },

    '& th': {
      backgroundColor: '#E0E0E0',
      color: '#333333',
      borderBottom: '1px solid #B3B3B3',
      padding: '14px !important',
      position: 'relative',

      '&:not(:last-child):after': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: -1,
        right: 0,
        width: 1,
        backgroundColor: '#FFFFFF',
      },
    },

    '& td': {
      padding: '14px !important',
      fontSize: 14,
      verticalAlign: 'middle',
    },
  },
  depositsTable: {
    padding: 0,
  },
}));
