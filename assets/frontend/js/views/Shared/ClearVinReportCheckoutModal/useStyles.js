import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    padding: 0,
    backgroundColor: '#FFF',
  },
  infoText: {
    fontSize: 14,
    lineHeight: '20px',
    paddingTop: 14,
    paddingBottom: 16,
    backgroundColor: '#F6F6F6',
  },
  form: {
    paddingTop: 16,
    paddingBottom: 16,
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: 14,
  },
  spinner: {
    padding: 20,
    textAlign: 'center',
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
