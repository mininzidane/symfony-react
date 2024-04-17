import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  iframe: {
    width: '100%',
    height: '100%',
  },
  iframeModalBody: {
    overflow: [['hidden'], '!important'],
    height: '100vh',
    padding: 0,
  },
  nowrap: {
    whiteSpace: 'nowrap',
  },
  damagesDescriptionTooltip: {
    background: [['rgba(97, 97, 97, 0.9)'], '!important'],
    fontSize: '13px',
  },
}));
