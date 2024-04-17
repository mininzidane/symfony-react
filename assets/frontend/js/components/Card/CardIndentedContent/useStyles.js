import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[0, 32]],

    [breakpoints.down('sm')]: {
      padding: [[0, 18]],
    },
  },
}));
