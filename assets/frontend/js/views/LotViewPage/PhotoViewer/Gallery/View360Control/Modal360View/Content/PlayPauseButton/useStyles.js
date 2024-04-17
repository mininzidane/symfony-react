import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    marginRight: 14,
    width: 30,
    height: 30,
    flexShrink: 0,

    [breakpoints.down('sm')]: {
      marginRight: 10,
    },

    '&.is-disabled': {
      opacity: 0.4,
      pointerEvents: 'none',
    },

    '& img': {
      display: 'block',
    },
  },
}));
