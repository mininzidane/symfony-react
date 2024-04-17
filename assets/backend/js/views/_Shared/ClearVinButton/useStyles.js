import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  iframe: {
    height: '100%',
    width: '100%',
  },
  iframeModalBody: {
    overflow: [['hidden'], '!important'],
    height: '100vh',
    padding: 0,
  },
}));
