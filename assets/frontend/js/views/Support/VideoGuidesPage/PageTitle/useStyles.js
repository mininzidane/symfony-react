import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    margin: 0,
    paddingTop: 30,
    fontSize: 28,
    fontWeight: 300,
    lineHeight: '37px',

    [breakpoints.down('sm')]: {
      paddingTop: 16,
      fontSize: 16,
      lineHeight: '21px',
      fontWeight: 400,
    },
  },
}));
