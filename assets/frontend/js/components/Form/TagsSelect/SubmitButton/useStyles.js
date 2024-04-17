import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 52,
    height: 34,
    padding: 0,
    backgroundColor: '#2158F5',
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    zIndex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'background-color .2s ease',

    '&:hover': {
      backgroundColor: '#5681F7',
    },

    '&:active': {
      backgroundColor: '#0D43DB',
    },
  },
}));
