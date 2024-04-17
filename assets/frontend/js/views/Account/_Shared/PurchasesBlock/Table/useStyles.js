import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  contentText: {
    [breakpoints.down('md')]: {
      fontSize: 14,
    },
  },
}));
