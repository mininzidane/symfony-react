import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  '@global': {
    '.page-content': {
      paddingTop: 64,

      [breakpoints.down('lg')]: {
        paddingTop: 104,
      },

      [breakpoints.down('sm')]: {
        paddingTop: 92,
      },
    },
  },
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    boxShadow: '0 2px 3px rgba(0, 0, 0, .25)',
  },
  mainHeader: {
    backgroundColor: '#2158F5',
  },
  grid: {
    height: 64,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [breakpoints.down('sm')]: {
      height: 52,
    },
  },
  logos: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  abmLogo: {
    display: 'block',
    width: 134,

    [breakpoints.down('sm')]: {
      width: 96,
    },

    [breakpoints.down('xs')]: {
      width: 88,
    },
  },
  buttons: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridGap: 12,
    alignItems: 'center',

    '& img': {
      display: 'block',
    },
  },
}));
