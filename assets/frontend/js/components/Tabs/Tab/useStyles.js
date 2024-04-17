import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  tab: {
    marginRight: 38,
    minHeight: 0,
    minWidth: 0,
    width: 'auto',
    padding: [[10, 0]],
    fontSize: 16,
    lineHeight: '20px',
    fontWeight: 400,
    opacity: 1,
    color: '#333',
    textTransform: 'none',
    letterSpacing: 0,
    fontFamily: "'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif",
    transition: 'color .2s ease',

    [breakpoints.down('xs')]: {
      marginRight: 18,
    },

    '&:hover': {
      color: '#2158F5',
    },

    '&:last-child': {
      marginRight: 0,
    },

    '&$selected': {
      color: '#2158F5',
      pointerEvents: 'none',
    },
  },
  selected: {},
}));
