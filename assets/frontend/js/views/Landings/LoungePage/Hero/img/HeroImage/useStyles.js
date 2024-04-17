import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    position: 'absolute',
    top: -300,
    right: -125,

    [breakpoints.down('lg')]: {
      right: -250,
    },

    [breakpoints.down('md')]: {
      right: -330,
    },

    [breakpoints.down('sm')]: {
      top: -175,
      right: '50%',
      transform: 'translateX(50%)',
      maxWidth: 'none',
    },
  },
}));
