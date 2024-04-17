import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    marginTop: 24,

    [breakpoints.down('sm')]: {
      marginTop: 8,
    },
  },
}));
