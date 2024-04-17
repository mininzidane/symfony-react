import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    outline: 'none',
    cursor: 'pointer',
    transition: 'background .15s ease',
    zIndex: 2,
    background: 'rgba(51, 51, 51, .65)',
    borderRadius: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 700,
    textTransform: 'uppercase',
    textAlign: 'center',
    marginRight: 15,
    height: 40,
    color: 'white',
    fontSize: 14,

    [breakpoints.down('md')]: {
      height: 30,
    },

    '&:hover': {
      background: '#4F4F4F',
    },
  },
}));
