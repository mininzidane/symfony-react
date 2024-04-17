import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  title: {
    ...mixins.font(42, 54, 600),
    margin: [[70, 0, 0]],
    color: '#FFF',

    [breakpoints.down('lg')]: {
      ...mixins.font(32, 40),
    },

    [breakpoints.down('md')]: {
      marginTop: 10,

      '& br': {
        display: 'none',
      },
    },

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 32),
      marginTop: 0,
    },
  },
  subtitle: {
    ...mixins.font(24, 32, 300),
    margin: [[32, 0, 0]],
    color: '#FFF',

    [breakpoints.down('lg')]: {
      ...mixins.font(20, 27),
      marginTop: 22,
    },

    [breakpoints.down('sm')]: {
      ...mixins.font(16, 21),
    },
  },
}));
