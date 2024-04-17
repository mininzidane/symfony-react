import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    margin: '0 auto',
    maxWidth: '1143px',
    backgroundColor: '#FBF2D1',
    padding: '26px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '16px',
    justifyContent: 'space-between',
    [breakpoints.down('lg')]: {
      maxWidth: '974px',
    },
    [breakpoints.down('md')]: {
      maxWidth: '741px',
    },
    [breakpoints.down('sm')]: {
      margin: '0 23px',
    },
    [breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  title: {
    fontWeight: 'bold',
  },
  link: {
    marginLeft: 36,
    [breakpoints.down('xs')]: {
      marginTop: '8px',
      marginLeft: 0,
    },
  },
}));
