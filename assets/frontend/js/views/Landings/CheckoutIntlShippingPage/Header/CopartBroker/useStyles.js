import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'block',
    width: 148,
    height: 30,
    opacity: 0.5,
    flexShrink: 0,

    [breakpoints.down('md')]: {
      width: 85,
      height: 16,
    },

    '@media(max-width: 359px)': {
      display: 'none',
    },
  },
}));
