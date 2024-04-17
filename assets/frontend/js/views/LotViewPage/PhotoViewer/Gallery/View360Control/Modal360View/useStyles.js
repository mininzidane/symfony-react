import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.down('sm')]: {
      alignItems: 'flex-start',
      paddingTop: '100px',

      'body.is-mobile-header-minimized &': {
        paddingTop: '60px',
      },
    },
  },
  container: {
    padding: 0,
    borderRadius: 4,
    backgroundColor: '#F6F6F6',
    boxShadow: '0 0 50px rgba(0, 0, 0, 0.35)',

    [breakpoints.down('sm')]: {
      width: '100vw !important',
      maxWidth: '100vw !important',
      borderRadius: 0,
    },
  },
}));
