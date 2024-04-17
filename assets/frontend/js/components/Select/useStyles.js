import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  listItem: {
    fontSize: 16,
  },
  '&:hover': {
    backgroundColor: '#D7E3EB',
  },
  paper: {
    padding: 0,
  },
  popper: {
    position: 'absolute',
  },
}));
