import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: [[10, 10, 10, 18]],
    backgroundColor: '#FFF1D2',
    borderRadius: 4,
    marginBottom: 4,

    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      padding: [[10, 14, 14, 14]],
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
}));
