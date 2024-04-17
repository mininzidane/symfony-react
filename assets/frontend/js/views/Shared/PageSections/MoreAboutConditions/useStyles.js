import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#FFFFFF',
    padding: [[30, 14, 36]],
    [breakpoints.up('lg')]: {
      paddingBottom: 50,
    },
  },
  content: {
    maxWidth: '82%',
    margin: '0 auto',
    fontSize: 18,
    lineHeight: '24px',
    fontWeight: 400,
    color: '#333333',
    textAlign: 'center',

    [breakpoints.up('md')]: {
      fontSize: 23,
      lineHeight: '30px',
      maxWidth: 630,
    },

    [breakpoints.up('lg')]: {
      fontSize: 23,
      lineHeight: '30px',
      maxWidth: 776,
    },
  },
}));
