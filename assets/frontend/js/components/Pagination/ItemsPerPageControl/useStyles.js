import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    ...mixins.font(14, 16, 400),
    color: '#333',
  },
  grid: {
    display: 'inline-flex',
    alignItems: 'center',
    marginLeft: 10,
  },
  separator: {
    width: 1,
    height: 14,
    backgroundColor: '#333',
    margin: [[0, 8]],
  },
  button: {
    userSelect: 'none',
    color: '#2158F5',

    '&:hover': {
      textDecoration: 'underline',
    },

    '&.is-active': {
      pointerEvents: 'none',
      fontWeight: 700,
      color: '#333',
    },
  },
}));
