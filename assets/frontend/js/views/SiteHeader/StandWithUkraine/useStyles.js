import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    marginLeft: 8,

    [breakpoints.down('sm')]: {
      marginLeft: 5,
      width: 64,
    },
  },
}));
