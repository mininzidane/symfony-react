import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    margin: 0,
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 400,
    lineHeight: '42px',

    [breakpoints.down('sm')]: {
      fontSize: 24,
      lineHeight: '32px',
    },
  },
}));
