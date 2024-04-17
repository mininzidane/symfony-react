import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#E5E5E5',
    padding: [[36, 0, 54]],
    [breakpoints.down('sm')]: {
      padding: [[22, 0, 30]],
    },
  },
  content: {
    fontSize: 18,
    lineHeight: '24px',
    maxWidth: '1012px',
    margin: '0 auto',
    paddingTop: '26px',
    textAlign: 'center',
    [breakpoints.down('lg')]: {
      maxWidth: '746px',
    },
    [breakpoints.down('sm')]: {
      paddingTop: '8px',
      fontSize: 16,
    },
  },
}));
