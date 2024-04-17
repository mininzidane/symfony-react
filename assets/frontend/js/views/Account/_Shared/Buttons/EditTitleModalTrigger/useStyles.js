import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    width: 34,
    height: 34,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,

    '&:hover': {
      backgroundColor: '#C2D6ED',
    },

    [breakpoints.down('sm')]: {
      width: 20,
      height: 20,
      marginRight: -4,
    },
  },
  icon: {
    width: 14,
    height: 14,
  },
}));
