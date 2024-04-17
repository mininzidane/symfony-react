import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    padding: [[40, 0, 55]],
    backgroundColor: '#FFF',

    [breakpoints.down('sm')]: {
      padding: [[24, 0]],
    },
  },
  title: {
    ...mixins.font(32, 38, 400),
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 32),
    },
  },
  stepLabel: {
    ...mixins.font(14, 20, 700),
    color: '#999999',
    marginTop: 15,
  },
  stepDesc: {
    ...mixins.font(14, 22, 700),
  },
  steps: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [breakpoints.down('sm')]: {
      marginTop: 10,
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  step: {
    textAlign: 'center',
    height: 160,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end',

    [breakpoints.down('sm')]: {
      height: 'auto',
      padding: [[24, 0]],
    },
  },
  arrow: {
    marginTop: 15,

    [breakpoints.down('md')]: {
      width: 30,
    },

    [breakpoints.down('sm')]: {
      margin: 0,
      width: 40,
      transform: 'rotate(90deg)',
    },
  },
}));
