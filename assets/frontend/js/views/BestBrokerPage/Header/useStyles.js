import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  '@global': {
    '.page-content': {
      paddingTop: 60,

      [breakpoints.down('sm')]: {
        paddingTop: 52,
      },
    },
  },
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: '#2158F5',
  },
  grid: {
    height: 60,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [breakpoints.down('sm')]: {
      height: 52,
    },
  },
  abmLogoLink: {
    ...mixins.extraHitbox(),
    position: 'relative',
  },
  abmLogoImage: {
    display: 'block',
    width: 123,

    [breakpoints.down('sm')]: {
      width: 96,
    },

    [breakpoints.down('xs')]: {
      width: 88,
    },
  },
  copartLogo: {
    display: 'block',
    width: 160,

    [breakpoints.down('sm')]: {
      width: 120,
    },

    [breakpoints.down('xs')]: {
      width: 105,
    },
  },
  title: {
    ...mixins.font(16, 16),
    margin: '0',
    color: 'white',
    textTransform: 'uppercase',
    [breakpoints.down('md')]: {
      ...mixins.font(14),
    },
    [breakpoints.down('sm')]: {
      ...mixins.font(8, 10),
      textAlign: 'center',
      maxWidth: 142,
      padding: '0 12px',
    },
  },
}));
