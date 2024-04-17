import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    paddingTop: 35,
    paddingBottom: 60,
    backgroundColor: '#FFF',
    overflow: 'hidden',

    '@media (max-width: 1440px)': {
      maxWidth: 1170,
      paddingLeft: 15,
      paddingRight: 15,
    },

    [breakpoints.down('lg')]: {
      maxWidth: 1004,
    },

    [breakpoints.down('md')]: {
      maxWidth: 768,
    },

    [breakpoints.down('sm')]: {
      padding: [[24, 0, 35]],
    },
  },
  container: {
    marginTop: 80,
    padding: [[0, 100]],
    '@media (max-width: 1440px)': {
      padding: [[0, 60]],
    },
  },
  containerMobile: {
    margin: [[27, 0, -130]],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 1150,
    padding: [[50, 0]],
  },
  adsBanner: {
    marginTop: '-15px !important',
    marginBottom: '20px !important',

    [breakpoints.down('sm')]: {
      marginTop: '-10px !important',
      marginBottom: '15px !important',
    },
  },
}));
