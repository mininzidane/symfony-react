import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  logo: {
    display: 'block',
    width: 192,
    marginLeft: 35,

    [breakpoints.down('sm')]: {
      width: 120,
      marginLeft: 25,
    },

    [breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  loungeLogo: {
    display: 'block',
    width: 100,
    marginLeft: 35,

    [breakpoints.down('sm')]: {
      width: 72,
      marginLeft: 25,
    },

    [breakpoints.down('xs')]: {
      display: 'none',
    },
  },
}));
