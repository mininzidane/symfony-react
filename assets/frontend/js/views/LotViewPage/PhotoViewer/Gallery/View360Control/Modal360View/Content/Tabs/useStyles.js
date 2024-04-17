import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    border: '1px solid #FFFFFF',
    borderRadius: 4,

    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  tab: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 100,
    minHeight: 28,
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 400,
    color: '#FFFFFF',

    [breakpoints.down('sm')]: {
      minWidth: '50%',
    },

    '&.is-active': {
      fontWeight: 700,
      backgroundColor: '#FFFFFF',
      color: '#2158F5',
    },
  },
}));
