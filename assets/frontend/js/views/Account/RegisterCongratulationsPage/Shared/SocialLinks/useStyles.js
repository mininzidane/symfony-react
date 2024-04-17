import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.down('xs')]: {
      padding: 0,
      marginTop: 5,
      width: '100%',
    },
  },
}));
