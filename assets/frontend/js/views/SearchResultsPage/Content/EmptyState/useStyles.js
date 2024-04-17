import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    paddingBottom: 30,
    maxWidth: 'none',

    [breakpoints.up('sm')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },

    [breakpoints.down('sm')]: {
      minHeight: 300,
    },
  },
}));
