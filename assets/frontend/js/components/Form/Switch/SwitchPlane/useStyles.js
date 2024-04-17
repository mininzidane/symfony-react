import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {},
  switchRoot: {
    padding: '9px',
    margin: '-9px',
  },
  switchBase: {
    color: '#FFFFFF',
    padding: '11px',
  },
  colorPrimary: {
    '&$checked': {
      color: '#fff',
    },
    '&$checked + $track': {
      backgroundColor: '#2158F5',
    },
  },
  checked: {},
  track: {
    backgroundColor: '#BDBDBD',
    borderRadius: '28px',
  },
  thumb: {
    width: '16px',
    height: '16px',
    boxShadow: '0px 2px 6px rgb(0 0 0 / 20%)',
  },
  label: {
    marginRight: '12px',
    fontSize: '14px',
  },
}));
