import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: '700',
    padding: [[4, 10]],
    border: '1px solid #FFF',
    width: '100%',
    color: '#FFF',
    backgroundColor: 'transparent',
    borderRadius: 25,
    display: 'block',
    transition: 'color .2s ease, background .2s ease',

    '&:hover': {
      color: '#333333',
      backgroundColor: '#FFF',
    },

    '&:active': {
      color: '#333333',
      backgroundColor: '#BDBDBD',
    },
  },
}));
