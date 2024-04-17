import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    zIndex: 4002,
    height: 60,
    width: '100%',
    top: 0,
    pointerEvents: 'none',

    [breakpoints.down('lg')]: {
      width: 'auto',
      right: 30,
    },

    [breakpoints.down('md')]: {
      right: 14,
    },

    [breakpoints.down('sm')]: {
      height: 52,
    },
  },
  label: {
    ...mixins.font(18, 22, 400),
    color: '#FFFFFF',
    marginRight: 10,

    [breakpoints.down('sm')]: {
      ...mixins.font(14),
    },
  },
}));
