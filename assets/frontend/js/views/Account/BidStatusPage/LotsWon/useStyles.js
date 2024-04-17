import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    paddingBottom: 50,
    minHeight: 400,
    position: 'relative',
    paddingTop: 20,
    [breakpoints.down('sm')]: {
      paddingTop: 14,
    },
  },
  facebookBanner: {
    marginBottom: 20,

    [breakpoints.down('sm')]: {
      marginBottom: 14,
    },
  },
  mobileWrap: {
    [breakpoints.down('xs')]: {
      padding: [[0, 14]],
    },
  },
}));
