import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[6, 4, 4, 4]],
    minWidth: 60,
    marginRight: 0,

    [breakpoints.down('md')]: {
      minWidth: 50,
    },

    [breakpoints.down('sm')]: {
      marginLeft: 'auto',
    },
  },
}));
