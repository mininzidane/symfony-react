import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    minWidth: 230,

    [breakpoints.down('sm')]: {
      minWidth: '100%',
    },
  },
}));
