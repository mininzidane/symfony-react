import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  message: {
    position: 'relative',
  },
  messageText: {
    fontSize: 14,
    lineHeight: '22px',

    '&.is-loading': {
      visibility: 'hidden',
    },
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
