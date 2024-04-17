import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  input: {
    padding: [[15, 7, 15, 22]],
    background: 'white',
    borderRadius: 2,
  },
  inputRoot: {
    fontSize: 14,

    '& > input': {
      padding: '0 !important',

      '&::placeholder': {
        textTransform: 'uppercase',
      },
    },
  },
  option: {
    color: '#444',
    fontSize: 14,
    padding: [[5, 8, 5, 20]],
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
  },
}));
