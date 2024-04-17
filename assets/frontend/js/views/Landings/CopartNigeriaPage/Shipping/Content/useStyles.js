import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.down('md')]: {
      paddingBottom: 50,
    },

    [breakpoints.down('sm')]: {
      paddingBottom: 35,
    },
  },
  title: {
    fontSize: 32,
    lineHeight: '36px',
    margin: [[45, 0, 0]],

    [breakpoints.down('lg')]: {
      marginTop: 10,
    },

    [breakpoints.down('md')]: {
      marginTop: 0,
      fontSize: 24,
      lineHeight: '32px',
    },
  },
  text: {
    fontSize: 18,
    lineHeight: '24px',
    marginTop: 25,

    [breakpoints.down('md')]: {
      fontSize: 16,
      lineHeight: '22px',
    },
  },
}));
