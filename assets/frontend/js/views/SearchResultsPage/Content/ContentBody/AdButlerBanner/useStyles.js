import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    margin: '15px auto 0',

    [breakpoints.down('sm')]: {
      marginTop: 10,
    },
  },
}));
