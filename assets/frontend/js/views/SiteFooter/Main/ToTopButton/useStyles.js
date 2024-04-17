import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    color: '#FFF',
    marginLeft: 'auto',
    opacity: 0.5,
    cursor: 'pointer',

    '&:hover': {
      opacity: 1,
    },

    '& img': {
      marginLeft: 10,
    },
  },
}));
