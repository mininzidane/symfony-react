import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 14,
    lineHeight: '20px',
    marginTop: 10,
    paddingBottom: 10,
  },
  tooltip: {
    zIndex: 9999999,
  },
  tooltipTrigger: {
    position: 'relative',
    top: -1,
  },
  label: {
    display: 'flex',
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 400,
    color: '#333',
  },
  tickbox: {
    '& label': {
      fontSize: 14,
      lineHeight: '20px',
      color: '#333',
    },
  },
  radioButton: {
    '& label': {
      fontSize: 14,
      lineHeight: '20px',
      color: '#333',
    },
  },
  value: {
    marginLeft: 'auto',
    whiteSpace: 'nowrap',
    paddingLeft: '15px',
  },
}));
