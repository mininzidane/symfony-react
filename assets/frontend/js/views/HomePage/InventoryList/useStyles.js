import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    paddingTop: 35,
    paddingBottom: 45,
    backgroundColor: '#FFF',

    '&.is-loading': {
      minHeight: 1050,

      [breakpoints.down('lg')]: {
        minHeight: 1296,
      },

      [breakpoints.down('sm')]: {
        minHeight: 1204,
      },

      [breakpoints.down('xs')]: {
        minHeight: 1570,
      },
    },

    '@media (max-width: 1440px)': {
      maxWidth: 1170,
      paddingLeft: 15,
      paddingRight: 15,
    },

    [breakpoints.down('lg')]: {
      maxWidth: 1004,
    },

    [breakpoints.down('md')]: {
      maxWidth: 768,
    },

    [breakpoints.down('sm')]: {
      paddingTop: 24,
      paddingBottom: 35,
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'calc(100% - 300px) 300px',
    marginTop: 24,

    [breakpoints.down('md')]: {
      textAlign: 'center',
      gridTemplateColumns: '1fr',
      gridGap: 40,
    },

    [breakpoints.down('sm')]: {
      gridGap: 30,
    },
  },
  linkContainer: {
    width: '100%',
    minWidth: 0,

    [breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
}));
