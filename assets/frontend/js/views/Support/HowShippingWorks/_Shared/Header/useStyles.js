import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    padding: [[90, 0, 95]],
    display: 'flex',
    backgroundPositionX: '30% !important',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    maxWidth: 'none',

    [breakpoints.down('sm')]: {
      justifyContent: 'center',
      textAlign: 'center',
      backgroundPosition: '0 !important',
      padding: [[50, 0]],
    },
  },
  title: {
    marginTop: 20,
    ...mixins.font(34, 38, 400),

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 32),
    },
  },
  subtitle: {
    marginTop: 16,
    ...mixins.font(20, 28, 300),
    opacity: 0.7,

    [breakpoints.down('sm')]: {
      ...mixins.font(16, 24),
    },
  },
}));
