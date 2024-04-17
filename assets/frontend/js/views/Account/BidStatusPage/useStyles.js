import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  container: {
    position: 'relative',

    [breakpoints.down('xs')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
}));
