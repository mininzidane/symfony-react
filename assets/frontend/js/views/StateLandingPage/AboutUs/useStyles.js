import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    background: 'white',

    [breakpoints.up('lg')]: {
      padding: [[60, 0]],
    },
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  articles: {
    [breakpoints.up('lg')]: {
      marginRight: 50,
      marginTop: -20,
    },

    [breakpoints.down('lg')]: {
      marginBottom: 20,
    },
  },
  article: {
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 300,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    lineHeight: '18px',
    fontWeight: 700,
    color: '#3371BD',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  img: {
    flexShrink: 0,
    width: '100%',

    [breakpoints.up('lg')]: {
      maxWidth: 420,
    },

    [breakpoints.up('xl')]: {
      maxWidth: 540,
    },

    [breakpoints.down('md')]: {
      display: 'none',
    },
  },
  mobileImg: {
    display: 'none',
    margin: 'auto',
    maxWidth: 500,

    [breakpoints.down('md')]: {
      display: 'block',
    },
  },
}));
