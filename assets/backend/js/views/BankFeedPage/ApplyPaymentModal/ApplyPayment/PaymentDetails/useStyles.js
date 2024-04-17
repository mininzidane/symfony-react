import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    '& tr > td': {
      fontSize: '14px',
      '&:first-child': {
        width: 180,
        color: '#6B7384',
      },
    },
  },
  title: {
    fontSize: '18px',
    lineHeight: '30px',
    color: '#000',
    marginBottom: '8px',
  },
  hide: {
    display: 'none',
  },
  error: {
    color: 'red',
    fontSize: 12,
    lineHeight: '18px',
    marginTop: 3,
  },
}));
