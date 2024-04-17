import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[20, 0, 40]],
    minHeight: 400,
    position: 'relative',

    [breakpoints.down('sm')]: {
      paddingTop: 16,
    },
  },
}));
