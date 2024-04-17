import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    padding: [[15, 0]],
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  closeButton: {
    ...mixins.extraHitbox(),
    position: 'absolute !important',
    top: 25,
    right: 30,
    cursor: 'pointer',
    userSelect: 'none',

    '&:hover': {
      opacity: 0.6,
    },

    [breakpoints.down('sm')]: {
      right: 20,
      top: 22,
    },
  },
}));
