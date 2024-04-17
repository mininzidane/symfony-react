import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
  content: {
    color: 'white',
    textAlign: 'center',
    padding: [[130, 40]],

    [breakpoints.down('lg')]: {
      padding: [[100, 40]],
    },

    [breakpoints.down('md')]: {
      padding: [[60, 40]],
    },

    [breakpoints.down('sm')]: {
      padding: [[25, 40]],
    },
  },
  title: {
    fontSize: 37,
    lineHeight: '46px',
    marginBottom: 30,

    [breakpoints.down('sm')]: {
      fontSize: 18,
      lineHeight: '24px',
      marginBottom: 20,
    },
  },
}));
