import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  body: {
    backgroundColor: '#fff',
  },
  actions: {
    marginTop: 8,
    display: 'flex',
    flexWrap: 'wrap-reverse',
    marginLeft: '-6px',
    marginRight: '-6px',
  },
  btnWrap: {
    width: 'auto',
    minWidth: '50%',
    flexShrink: '0',
    flexGrow: '1',
    padding: 6,
  },
}));
