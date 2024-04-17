import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#F1F1F8',
  },
  container: {
    padding: [[40, 0, 42]],

    [breakpoints.down('sm')]: {
      padding: [[0, 0, 25]],
    },
  },
  wrap: {
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',

    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  description: {
    marginRight: 62,
    overflow: 'hidden',

    [breakpoints.down('md')]: {
      marginRight: 36,
    },

    [breakpoints.down('sm')]: {
      marginRight: 0,
    },
  },
  form: {
    display: 'grid',
    gridTemplateColumns: '500px 500px',
    gridGap: 20,

    [breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      gridGap: 14,
    },

    [breakpoints.down('sm')]: {
      margin: [[0, 14]],
      marginTop: 14,
    },
  },
  adBanner: {
    display: 'flex',
    justifyContent: 'center',

    [breakpoints.down('md')]: {
      order: 2,
    },
  },
  loginView: {
    maxWidth: 500,
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
    borderRadius: 4,
  },
}));
