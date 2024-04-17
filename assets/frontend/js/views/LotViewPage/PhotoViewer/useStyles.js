import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.down('sm')]: {
      margin: [[7, 0]],
    },
  },
}));
