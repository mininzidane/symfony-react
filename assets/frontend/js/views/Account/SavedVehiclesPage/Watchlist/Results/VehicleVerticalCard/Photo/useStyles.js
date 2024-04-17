import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,

    [breakpoints.down('sm')]: {
      borderRadius: 0,
    },
  },
}));
