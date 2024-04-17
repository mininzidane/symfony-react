import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '11px 14px 11px 14px',
    minHeight: '52px',
    backgroundColor: '#FFF1D2',
    borderRadius: 4,
    marginBottom: 4,

    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      padding: [[10, 14, 14, 14]],
    },

    '&.is-accepted': {
      backgroundColor: 'rgba(74,144,41,.12)',
    },
  },
  label: {
    display: 'flex',
    alignItems: 'center',

    [breakpoints.down('sm')]: {
      paddingBottom: 10,
    },
  },
  icon: {
    marginRight: 8,
  },
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  button: {
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      width: '100% !important',
    },
  },
}));
