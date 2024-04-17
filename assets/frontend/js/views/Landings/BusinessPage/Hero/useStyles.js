import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[36, 0, 42]],
    backgroundSize: 'cover',
    backgroundColor: '#082340',
    backgroundPosition: 'center',

    [breakpoints.down('md')]: {
      padding: 0,
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'auto 430px',
    gridGap: 80,

    [breakpoints.down('lg')]: {
      gridGap: 50,
    },

    [breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      gridGap: 0,
    },
  },
  description: {
    [breakpoints.down('md')]: {
      padding: [[30, 0, 34]],
    },

    [breakpoints.down('sm')]: {
      padding: [[24, 0, 32]],
    },
  },
  title: {
    margin: 0,
    fontSize: 30,
    lineHeight: '40px',
    fontWeight: 700,
    color: '#FFFFFF',

    [breakpoints.down('md')]: {
      '& br': {
        display: 'none',
      },
    },

    [breakpoints.down('sm')]: {
      fontSize: 18,
      lineHeight: '24px',
    },
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 22,
    lineHeight: '32px',
    fontWeight: 300,
    marginTop: 20,

    [breakpoints.down('lg')]: {
      '& br': {
        display: 'none',
      },
    },

    [breakpoints.down('sm')]: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: '20px',
      marginTop: 10,
    },
  },
}));
