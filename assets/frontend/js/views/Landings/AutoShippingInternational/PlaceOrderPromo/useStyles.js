import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    padding: [[50, 0, 60]],
    backgroundSize: 'cover',
    maxWidth: '100%',
    color: '#FFFFFF',
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      padding: [[35, 0, 45]],
    },
  },
  title: {
    ...mixins.font(28, 34, 400),
    color: '#FFF',
    paddingBottom: 30,
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 32),
      paddingBottom: 20,
    },
  },
}));
