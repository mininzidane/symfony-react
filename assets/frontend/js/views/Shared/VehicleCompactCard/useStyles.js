import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    backgroundColor: '#FFF',
    marginBottom: 4,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
    padding: 0,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}));
