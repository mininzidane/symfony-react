import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    padding: [[60, 0, 70]],
    minHeight: 400,
    margin: [[0, 'auto']],
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      padding: [[40, 0]],
      minHeight: 365,
    },
  },

  group: {
    maxWidth: 440,

    [breakpoints.up('md')]: {
      paddingBottom: 40,
    },
  },

  title: {
    fontSize: 28,
    lineHeight: '34px',
    fontWeight: 400,
    margin: [[26, 0, 0]],

    [breakpoints.down('sm')]: {
      marginTop: 20,
    },
  },
  subtitle: {
    margin: [[12, 0, 0]],
    fontSize: 16,
    lineHeight: '24px',
    fontWeight: 400,

    [breakpoints.up('md')]: {
      padding: [[0, 20]],
    },

    [breakpoints.down('sm')]: {
      marginTop: 15,
    },
  },
  button: {
    marginTop: 30,
    minWidth: 180,

    [breakpoints.down('sm')]: {
      marginTop: 25,
    },
  },
}));
