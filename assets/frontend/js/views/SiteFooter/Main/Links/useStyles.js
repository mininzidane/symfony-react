import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[32, 0, 48]],
    backgroundColor: '#1D1E20',

    [breakpoints.down('md')]: {
      padding: [[24, 0]],
    },
  },
}));
