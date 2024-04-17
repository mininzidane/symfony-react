import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: ({ isAuthenticated }) => ({
    padding: isAuthenticated ? [[0, 0, 85]] : [[25, 0, 35]],

    [breakpoints.down('md')]: {
      padding: isAuthenticated ? [[45, 0, 60]] : [[25, 0, 35]],
    },

    [breakpoints.down('sm')]: {
      padding: isAuthenticated ? [[25, 0, 30]] : [[20, 0, 22]],
    },
  }),
  title: {
    textAlign: 'left',
    "[dir='rtl'] &": {
      textAlign: 'right',
    },
  },
  grid: ({ isAuthenticated }) => ({
    display: 'grid',
    gridTemplateColumns: isAuthenticated ? '100%' : '1fr 420px',
    gridGap: 100,
    alignItems: 'start',
    textAlign: isAuthenticated ? 'center' : null,

    [breakpoints.down('lg')]: {
      gridGap: 40,
    },

    [breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
    },

    [breakpoints.down('sm')]: {
      gridGap: 30,
    },
  }),
  advantages: {
    paddingTop: '26px',
    [breakpoints.down('sm')]: {
      paddingTop: '16px',
    },
  },
}));
