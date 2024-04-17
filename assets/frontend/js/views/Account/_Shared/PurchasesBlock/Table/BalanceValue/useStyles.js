import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    '&.is-highlighted': {
      color: '#981B1E',
    },

    [breakpoints.down('md')]: {
      fontSize: 14,
    },
  },
}));
