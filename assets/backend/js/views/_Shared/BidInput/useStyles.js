import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  wrapper: {
    display: 'flex',
    height: '35px',
    alignItems: 'center',
    border: '1px solid #e5e6e7',

    '&.is-focused': {
      border: '1px solid #1AB394',
    },
  },
  symbol: {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    padding: '0 10px',
    borderRight: '1px solid #e5e6e7',
  },
  input: {
    display: 'flex',
    flex: 1,
    border: 'none',
    height: '100%',
    padding: '5px 10px',
    outline: 'none',
  },
}));
