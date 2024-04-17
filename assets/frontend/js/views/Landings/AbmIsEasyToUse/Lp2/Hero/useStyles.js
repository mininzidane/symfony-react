import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[0, 0, 48]],
    overflow: 'hidden',

    [breakpoints.down('sm')]: {
      padding: [[0, 0, 25]],
    },
  },
  title: {
    textAlign: 'center',
    fontSize: '32px',
    lineHeight: '50px',
    fontWeight: '300',
    color: 'white',
    margin: '36px 0 38px',

    [breakpoints.down('md')]: {
      fontSize: '28px',
      lineHeight: '42px',
    },

    [breakpoints.down('sm')]: {
      fontSize: '24px',
      lineHeight: '36px',
      margin: '0',
      padding: '30px 15px',
    },
  },
}));
