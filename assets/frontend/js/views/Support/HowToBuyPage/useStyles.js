import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    paddingBottom: '60px',
    [breakpoints.down('sm')]: {
      paddingBottom: '42px',
    },
  },
  title: {
    ...mixins.font(28, 39, 300),
    marginBottom: 5,
    marginTop: 24,
    [breakpoints.down('sm')]: {
      ...mixins.font(18),
      marginBottom: '10px',
    },
  },
  subtitle: {
    ...mixins.font(16, 24, 400),
    marginBottom: 20,
    marginTop: 0,
  },
}));
