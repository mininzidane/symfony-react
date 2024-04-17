import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    padding: '20px',
    minHeight: '135px',
    alignItems: 'center',
    textTransform: 'uppercase',
    justifyContent: 'center',
    flexDirection: 'column',
    fontSize: '14px',
    fontWeight: '700',
    border: '2px solid #2158F5',
    borderRadius: '4px',
    color: '#2158F5',
    [breakpoints.down('sm')]: {
      padding: '0 22px',
      flexDirection: 'row',
      minHeight: '40px',
    },
  },
  icon: {
    width: '22px',
    [breakpoints.down('sm')]: {
      marginTop: '6px',
      marginRight: '6px',
    },
  },
}));
