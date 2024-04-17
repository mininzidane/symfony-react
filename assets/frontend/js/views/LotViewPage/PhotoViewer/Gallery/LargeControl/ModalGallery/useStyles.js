import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    borderRadius: 4,
    backgroundColor: '#1A1A1A',
    boxShadow: '0 0 50px rgba(0, 0, 0, 0.35)',

    [breakpoints.down('sm')]: {
      height: '100vh',
      width: '100vw',
      maxWidth: '100vw',
      padding: 0,
      borderRadius: 0,
    },
  },
}));
