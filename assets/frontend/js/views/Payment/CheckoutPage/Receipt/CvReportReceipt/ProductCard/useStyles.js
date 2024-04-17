import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    border: '1px solid #C2C2C2',
    padding: [[15, 20]],
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  row: {
    fontSize: '14px',
    lineHeight: '20px',
    color: '#333',
  },
}));
