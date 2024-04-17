import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    fontSize: 14,
    lineHeight: '20px',
    paddingTop: 6,
    paddingBottom: 6,
  },
  value: {
    paddingLeft: 15,
    marginLeft: 'auto',
    whiteSpace: 'nowrap',
  },
  toggle: {
    display: 'flex',
    marginRight: 15,
  },
  tickbox: {
    '& label': {
      fontSize: 14,
      lineHeight: '20px',
      color: '#333',
    },
  },
  tooltip: {
    zIndex: 9999999,
  },
  tooltipWrap: {
    whiteSpace: 'nowrap',
  },
  tooltipTrigger: {
    position: 'relative',
    top: -1,
  },
}));
