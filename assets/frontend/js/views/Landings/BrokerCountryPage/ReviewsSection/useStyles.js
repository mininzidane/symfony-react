import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[15, 0, 10]],
    backgroundColor: '#F1F1F8',

    [breakpoints.down('sm')]: {
      paddingBottom: 0,
    },
  },
}));
