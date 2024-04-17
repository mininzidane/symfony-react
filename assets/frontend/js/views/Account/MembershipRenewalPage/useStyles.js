import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  container: {
    minHeight: '500px',
    paddingBottom: '50px',
    paddingTop: '30px',
    [breakpoints.down('sm')]: {
      paddingTop: 25,
    },
  },
}));
