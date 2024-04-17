import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    textAlign: 'center',
    padding: '80px 0',

    [breakpoints.down('sm')]: {
      padding: '50px 0',
    },
  },
  container: {
    maxWidth: 500,
    padding: [[0, 20]],
    margin: [[0, 'auto']],
  },
  image: {
    maxWidth: 250,

    [breakpoints.down('sm')]: {
      maxWidth: 100,
    },
  },
  title: {
    ...mixins.font(32, 44, 300),
    margin: [[10, 0, 0]],

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 30, 300),
    },
  },
  description: {
    ...mixins.font(16, 21, 400),
    color: 'rgba(0, 0, 0, 0.5)',
    margin: [[14, 0, 0]],

    [breakpoints.down('sm')]: {
      ...mixins.font(14, 20, 300),
    },
  },
  button: {
    marginTop: 45,

    [breakpoints.down('sm')]: {
      marginTop: 30,
    },
  },
}));
