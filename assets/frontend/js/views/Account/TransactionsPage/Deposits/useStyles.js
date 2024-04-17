import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  table: {
    marginTop: 20,

    [breakpoints.down('sm')]: {
      marginTop: 15,
    },
  },
  loaderContainer: {
    position: 'relative',
    minHeight: 150,
  },
}));
