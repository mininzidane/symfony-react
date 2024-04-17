import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'block',
    width: 148,
    height: 30,
    opacity: 0.5,
    flexShrink: 0,
    marginLeft: 20,

    [breakpoints.down('md')]: {
      width: 85,
      height: 16,
    },

    [breakpoints.down('sm')]: {
      marginLeft: 12,
    },

    [breakpoints.down(359)]: {
      display: 'none',
    },
  },
  alterLogo: {
    height: 30,
    display: 'block',
    opacity: 0.5,
    flexShrink: 0,
    marginLeft: 20,

    [breakpoints.down('md')]: {
      height: 16,
    },

    [breakpoints.down('sm')]: {
      marginLeft: 12,
    },

    [breakpoints.down(359)]: {
      display: 'none',
    },
  },
}));
