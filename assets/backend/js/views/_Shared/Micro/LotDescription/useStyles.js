import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  row: {
    lineHeight: '1',
    minHeight: '20px',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    display: 'flex',
    '&:empty': {
      minHeight: 'auto',
    },
  },
  iframe: {
    width: '100%',
    height: '100%',
    border: 0,
  },
  iframeModalBody: {
    overflow: [['hidden'], '!important'],
    height: '100vh',
    padding: 0,
  },
}));
