import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    margin: [[15, 8, 0, 0]],
    padding: [[5, 30, 5, 14]],
    minHeight: 24,
    borderRadius: '99px',
    backgroundColor: '#FFF',
    boxShadow: '0 2px 2px rgba(0, 0, 0, .25)',
    position: 'relative',

    '&:empty': {
      display: 'none',
    },
  },
  label: {
    color: '#000',
    fontSize: 12,
    lineHeight: '16px',
    fontWeight: 400,
  },
}));
