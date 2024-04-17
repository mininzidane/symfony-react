import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#F1F1F8',
    paddingTop: 36,
    paddingBottom: 40,

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
      paddingBottom: 32,
    },
  },
  grid: {
    display: 'grid',
    gridGap: '16px 38px',
    gridTemplateColumns: '1fr 1fr',
    marginTop: 30,

    [breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      gridGap: '14px',
    },

    [breakpoints.down('sm')]: {
      marginTop: 24,
      gridTemplateColumns: '1fr 1fr',
    },

    [breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
    },
  },
  container: {
    padding: 0,
    maxWidth: '1140px',
  },
}));
