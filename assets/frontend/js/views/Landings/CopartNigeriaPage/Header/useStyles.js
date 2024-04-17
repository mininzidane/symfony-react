import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  '@global': {
    '.page-content': {
      paddingTop: 90,

      [breakpoints.down('sm')]: {
        paddingTop: 60,
      },
    },
  },
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#FFF',
  },
  grid: {
    height: 90,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [breakpoints.down('sm')]: {
      height: 60,
    },
  },
  abmLogoLink: {
    ...mixins.extraHitbox(),
    position: 'relative',
  },
  abmLogoImage: {
    display: 'block',
    width: 134,

    [breakpoints.down('sm')]: {
      width: 96,
    },

    [breakpoints.down('xs')]: {
      width: 88,
    },
  },
  copartLogo: {
    display: 'block',
    height: 42,

    [breakpoints.down('sm')]: {
      height: 26,
    },

    [breakpoints.down('xs')]: {
      height: 23,
    },
  },
  chekiLogo: {
    width: 164,
    position: 'relative',
    top: -1,

    [breakpoints.down('sm')]: {
      width: 120,
    },

    [breakpoints.down('xs')]: {
      width: 105,
      margin: [[0, 15]],
      top: 1,
    },
  },
}));
