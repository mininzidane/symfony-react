import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[15, 0]],
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    lineHeight: '20px',

    [breakpoints.down('xs')]: {
      flexWrap: 'wrap',
    },
  },
  message: {
    display: 'flex',
    alignItems: 'flex-start',

    [breakpoints.down('xs')]: {
      width: '100%',
      marginBottom: 15,
    },
  },
  icon: {
    marginRight: 7,
  },
  cta: {
    marginLeft: 20,
    width: 'auto',
    minWidth: 140,

    [breakpoints.down('xs')]: {
      marginLeft: 0,
      width: '100%',
    },
  },
}));
