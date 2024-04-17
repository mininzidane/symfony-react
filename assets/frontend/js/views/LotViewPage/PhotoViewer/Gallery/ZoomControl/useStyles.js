import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[8, 10]],
    minWidth: 100,

    [breakpoints.down('sm')]: {
      display: 'none',
    },

    '& svg': {
      marginRight: 5,
    },
  },
}));
