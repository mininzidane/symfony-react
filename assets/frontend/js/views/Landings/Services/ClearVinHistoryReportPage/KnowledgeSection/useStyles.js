import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  title: {
    ...mixins.font(32, 42),
    paddingTop: 25,
    textAlign: 'center',
    paddingLeft: 75,
    paddingRight: 75,

    [breakpoints.down('lg')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 32),
    },
  },
  wrap: {
    maxWidth: 875,
    margin: [[20, 'auto']],

    [breakpoints.down('sm')]: {
      marginTop: 0,
      maxWidth: 350,
    },
  },
  img: {
    display: 'block',
  },
  desc: {
    color: '#B20000',
    ...mixins.font(16, 22),
    textAlign: 'right',
    paddingBottom: 20,
    paddingRight: 48,

    [breakpoints.down('sm')]: {
      textAlign: 'center',
      paddingRight: 0,
      paddingBottom: 10,

      '& img': {
        maxWidth: 350,
      },
    },
  },
}));
