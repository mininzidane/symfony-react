import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  form: {},
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr minmax(114px, auto)',
    gridGap: '42px',
  },
  sidebar: { width: 269 },
  action: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  timer: {
    fontSize: '14px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    marginRight: '12px',
    marginBottom: '4px',
  },
  receivedDataList: {
    marginTop: '6px',
  },
}));
