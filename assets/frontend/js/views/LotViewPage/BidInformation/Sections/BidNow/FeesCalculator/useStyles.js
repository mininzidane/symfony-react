import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  trigger: {
    fontSize: '14px',
    lineHeight: '18px',
    fontWeight: '400',
    color: '#2158F5',
    display: 'inline',
    borderBottom: '1px dashed currentColor',
    outline: 'none',
    '&.is-active': {
      textDecoration: 'none',
      borderBottomColor: 'transparent',
    },
  },
  title: {
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: '700',
  },
  close: {
    position: 'absolute !important',
    top: '25px',
    right: '25px',

    '&:hover': {
      opacity: '0.6',
    },
  },
  separator: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    margin: '11px 0',
    height: '1px',
  },
}));
