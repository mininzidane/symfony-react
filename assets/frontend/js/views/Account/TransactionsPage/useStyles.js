import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  container: {
    position: 'relative',
    paddingTop: 21,
    paddingBottom: 50,
    [breakpoints.down('sm')]: {
      paddingTop: 17,
    },
  },
}));
