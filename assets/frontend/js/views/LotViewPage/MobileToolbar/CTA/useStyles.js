import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    height: 36,
    backgroundColor: '#2158F5',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.25)',
    borderRadius: '99px',
    transition: 'all .2s ease',
    textAlign: 'center',
    padding: [[4, 14]],
    fontSize: 14,
    fontWeight: 700,
    lineHeight: '16px',
    color: 'white !important',
    display: 'flex',
    justifyContent: 'center',
    outline: 'none !important',
    alignItems: 'center',
    textTransform: 'uppercase',
    textDecoration: 'none !important',
    marginLeft: 12,

    '&:active': {
      backgroundColor: '#2D6D97',
    },
  },
  live: {
    fontSize: 14,
    minHeight: 36,
  },
  arrow: {
    margin: [[0, -2, 0, 6]],
    transformOrigin: 'center',
    transition: 'transform .2s ease',
    flexShrink: 0,

    '&.is-rotated': {
      transform: 'rotate(180deg)',
    },
  },
}));
