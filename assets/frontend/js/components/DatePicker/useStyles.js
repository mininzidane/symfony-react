import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  input: {
    width: '100%',
    cursor: 'pointer',
    fontSize: 14,
    padding: [[15, 15, 15, 22]],
    background: 'white',
    borderRadius: 2,
    fontWeight: 'bold',

    '& > input': {
      cursor: 'pointer',
      padding: 0,

      '&::placeholder': {
        textTransform: 'uppercase',
        fontWeight: 'normal',
      },
    },

    '&:hover $clearIcon': {
      opacity: 1,
    },
    '&.is-disabled': {
      backgroundColor: '#E0E0E0 !important',
      color: '#828282',
    },
  },
  paper: {
    padding: 0,
  },
  clearIcon: {
    marginRight: 10,
    opacity: 0,
  },
  suspense: {
    height: 405,
    width: 310,
    background: 'white',
    position: 'relative',
  },
}));
