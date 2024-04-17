import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  footer: {
    backgroundColor: '#F6F6F6',
    border: 'none',
    paddingTop: 0,
    paddingBottom: '20px 20px 4px',
  },
  characterLimit: {
    display: 'flex',
    justifyContent: 'right',
    fontSize: '12px',
    color: '#333',
    paddingTop: '4px',
  },
}));
