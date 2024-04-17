import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.down('md')]: {
      paddingLeft: 20,
      paddingRight: 20,
    },

    [breakpoints.down('sm')]: {
      paddingLeft: 14,
      paddingRight: 14,
    },
  },
}));
