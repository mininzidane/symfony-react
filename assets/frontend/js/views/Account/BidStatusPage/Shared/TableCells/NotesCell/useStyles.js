import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  lastReadMessage: {
    overflow: 'hidden',
    maxHeight: '72px',
    WebkitLineClamp: '4',
    WebkitBoxOrient: 'vertical',
    display: '-webkit-box',
    marginBottom: 3,
  },
}));
