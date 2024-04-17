import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#FFF1AA',
    padding: [[5, 15, 15, 15]],
    marginTop: 23,

    [breakpoints.down('sm')]: {
      marginTop: 20,
    },
  },
  buttonWrap: {
    marginTop: 10,
    flexGrow: 1,
  },
  button: {
    paddingLeft: '12px !important',
    paddingRight: '12px !important',
    fontSize: '11px !important',
    fontWeight: '700 !important',
    fontStyle: 'italic',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.15)',
  },
  clearvin: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'nowrap',
    flexGrow: 100,

    [breakpoints.down('sm')]: {
      flexWrap: 'wrap',
    },
  },
  vin: {
    padding: [[4, 10, 4, 0]],
    whiteSpace: 'nowrap',
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 400,

    '& strong': {
      fontWeight: 700,
    },
  },
  image: {
    marginRight: 7,
  },
}));
