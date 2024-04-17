import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.down('md')]: {
      height: '100%',
      overflowY: 'auto',
      overflowX: 'hidden',
      padding: [[0, 20]],
    },
  },
}));
