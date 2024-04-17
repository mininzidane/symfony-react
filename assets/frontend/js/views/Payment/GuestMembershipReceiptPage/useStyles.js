import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[40, 0]],
    backgroundColor: '#F1F1F8',

    [breakpoints.down('sm')]: {
      padding: [[15, 0]],
    },
  },
}));
