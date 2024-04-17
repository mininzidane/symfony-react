import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    color: '#FFF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: 274,
    [breakpoints.down('sm')]: {
      minHeight: 254,
    },
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: -30,
  },
  stars: {
    width: 254,
    [breakpoints.down('sm')]: {
      width: 186,
    },
  },
  title: {
    textAlign: 'center',
    marginTop: '6px',
    marginBottom: '4px',
    ...mixins.font(39, 52, 600),
    [breakpoints.down('sm')]: {
      marginTop: '10px',
      marginBottom: '9px',
      ...mixins.font(24, 32),
    },
  },
  subtitle: {
    textAlign: 'center',
    ...mixins.font(24, 32, 300),
    [breakpoints.down('sm')]: {
      ...mixins.font(18, 24),
    },
  },
}));
