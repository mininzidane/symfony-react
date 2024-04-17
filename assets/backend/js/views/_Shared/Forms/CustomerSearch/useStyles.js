import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  input: {
    background: 'white',
    borderRadius: 2,
  },
  inputRoot: {
    fontSize: 14,
  },
  option: {
    color: '#444',
    fontSize: 14,
    // padding: [[5, 8, 5, 20]],
    whiteSpace: 'nowrap',
    maxWidth: '100%',
    overflow: 'hidden',

    '&:hover': {
      color: 'white',
      background: '#017DD6',
    },
  },
  groupLabel: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
  textField: {
    '& label': {
      fontSize: 14,
    },
  },
}));
