import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    paddingBottom: 50,

    [breakpoints.down('sm')]: {
      paddingBottom: 40,
    },
  },
}));
