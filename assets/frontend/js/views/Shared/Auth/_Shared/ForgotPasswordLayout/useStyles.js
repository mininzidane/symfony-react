import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',

    [breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  content: {
    padding: [[27, 24]],
    border: 0,
    borderRadius: 4,
    maxWidth: 1140,
    textAlign: 'center',

    [breakpoints.down('xl')]: {
      maxWidth: 770,
    },

    [breakpoints.down('sm')]: {
      borderRadius: 0,
    },
  },
  title: {
    ...mixins.font(28, 39, 300),
    marginBottom: 10,
    marginTop: 0,
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      ...mixins.font(20, 27),
    },
  },
  subtitle: {
    ...mixins.font(14, 19, 300),
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
}));
