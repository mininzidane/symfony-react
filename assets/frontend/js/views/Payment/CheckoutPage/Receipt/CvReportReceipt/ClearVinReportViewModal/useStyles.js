import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    padding: 0,
    backgroundColor: '#FFF',
  },
  iframe: {
    height: '100%',
  },
  iframeModalBody: {
    overflow: [['hidden'], '!important'],
    height: '100vh',
    padding: 0,
  },
}));
