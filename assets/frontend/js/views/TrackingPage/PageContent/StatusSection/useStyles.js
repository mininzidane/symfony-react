import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    ...mixins.font(28, 34, 400),
    padding: [[30, 0, 10]],
    display: 'flex',
    justifyContent: 'center',

    [breakpoints.down('sm')]: {
      ...mixins.font(18, 24),
      paddingTop: 15,
    },
  },
  status: {
    fontWeight: 700,
    color: '#2158F5',

    '&.is-inactive': {
      color: '#A5A5A5',
    },

    '&.is-done': {
      color: '#4A9029',
    },
  },
}));
