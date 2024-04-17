import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  icon: {
    marginTop: 64,
    marginBottom: 25,
    [breakpoints.down('sm')]: {
      marginTop: 38,
      marginBottom: 28,
    },
  },
  text: {
    color: '#4F4F4F',
    ...mixins.font(28, 30),
    textAlign: 'center',
    marginBottom: 38,
    [breakpoints.down('sm')]: {
      ...mixins.font(25),
      marginBottom: 24,
    },
  },
  cta: {
    maxWidth: 384,
  },
}));
