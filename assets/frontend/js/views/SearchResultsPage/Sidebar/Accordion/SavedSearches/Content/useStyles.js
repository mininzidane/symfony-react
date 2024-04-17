import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  loader: {
    height: 80,
    width: '100%',
    position: 'relative',
  },
  empty: {
    color: '#C8C8C8',
  },
  row: {
    display: 'flex',
    marginBottom: 6,

    '&:last-child': {
      marginBottom: 0,
    },
  },
  title: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    marginRight: 5,
  },
  count: {
    marginLeft: 'auto',
  },
  showAll: {
    marginTop: 14,
  },
}));
