import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    outline: 'none',
    cursor: 'pointer',
    transition: 'background .15s ease',
    zIndex: 2,
    background: 'rgba(0, 0, 0, 65%)',
    borderRadius: 25,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '&:hover': {
      background: '#4F4F4F',
    },
  },
}));
