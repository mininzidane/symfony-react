import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    marginTop: -15,
    marginBottom: 20,

    '&:empty': {
      display: 'none',
    },

    [breakpoints.down('sm')]: {
      marginBottom: 16,
    },
  },
}));
