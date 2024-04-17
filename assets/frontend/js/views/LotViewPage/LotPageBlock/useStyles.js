import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    margin: 10,

    [breakpoints.down('sm')]: {
      margin: [[7, 14]],
    },
  },
}));
