import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    position: 'absolute',
    top: 20,
    left: 14,
    width: 'calc(100% - 28px)',
    display: 'flex',
    justifyContent: 'center',
    zIndex: 20,
    opacity: 0,
    transition: 'opacity .15s ease, background-color 0.15s ease',

    '&:hover': {
      opacity: '1 !important',
      backgroundColor: '#2158F5 !important',
    },

    '&:active': {
      backgroundColor: '#0D43DB !important',
    },
  },
}));
