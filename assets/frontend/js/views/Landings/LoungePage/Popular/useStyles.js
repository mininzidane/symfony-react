import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    backgroundColor: '#FFF',
  },
  container: {
    maxWidth: 1460,
    margin: [[0, 'auto']],
    padding: [[0, 30, 50]],

    [breakpoints.down('lg')]: {
      maxWidth: 940,
    },

    [breakpoints.down('md')]: {
      padding: [[0, 30, 50]],
    },

    [breakpoints.down('sm')]: {
      padding: [[0, 14, 30]],
    },
  },
  title: {
    ...mixins.font(32, 42, 400),
    margin: 0,
    padding: [[42, 0]],
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 32, 400),
      padding: [[20, 0, 32]],
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '3fr 1fr',
    alignItems: 'center',

    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      gridGap: 40,
    },
  },
  links: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',

    [breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr 1fr',
    },
  },
  map: {
    position: 'relative',
    left: -50,

    [breakpoints.down('lg')]: {
      left: -20,
    },

    [breakpoints.down('md')]: {
      left: 0,
    },

    [breakpoints.down('sm')]: {
      maxWidth: 320,
    },
  },
  mapWrap: {
    [breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
}));
