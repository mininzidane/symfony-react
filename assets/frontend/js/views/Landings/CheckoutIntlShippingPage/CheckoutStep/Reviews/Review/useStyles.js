import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    color: '#000',
  },
  details: {
    display: 'flex',
    alignItems: 'center',

    [breakpoints.down('sm')]: {
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
  },
  info: {
    position: 'relative',
    top: -1,

    [breakpoints.down('sm')]: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
      textAlign: 'center',
      justifyContent: 'center',
    },
  },
  photo: {
    '& img': {
      borderRadius: '50%',
      width: 40,
      height: 40,
      marginRight: 12,

      [breakpoints.down('sm')]: {
        marginRight: 0,
      },
    },

    [breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center',
    },
  },
  name: {
    ...mixins.font(16, 20, 700),
    marginTop: 1,
    padding: [[3, 0, 5]],

    [breakpoints.down('sm')]: {
      width: '100%',
      order: -1,
    },
  },
  rating: {
    width: 60,
    transform: 'scale(1.4)',
    transformOrigin: 'center left',

    [breakpoints.down('sm')]: {
      transformOrigin: 'center',
    },
  },
  message: {
    ...mixins.font(16, 20),
    paddingTop: 12,

    [breakpoints.down('sm')]: {
      paddingTop: 10,
      textAlign: 'center',
    },
  },
}));
