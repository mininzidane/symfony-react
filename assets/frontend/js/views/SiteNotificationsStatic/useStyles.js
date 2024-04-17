import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    position: 'relative',
    zIndex: 300,
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.16)',

    '& > div:not(:first-child)': {
      borderTop: '1px solid #d6d6d6',
    },
  },
  notification: {
    padding: [[25, 0]],
    position: 'relative',
    backgroundColor: '#FFF1D2',
    '&.is-warning': {},
    '&.is-error': {
      backgroundColor: '#6F130B',
      color: '#fff',
      '& a': {
        color: '#fff',
        textDecoration: 'underline',
      },
    },
  },
}));
