import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  tabsFlexContainer: {
    [breakpoints.down('xs')]: {
      justifyContent: 'space-between',
    },
  },
  tabs: {
    minHeight: 28,
  },
  tab: {
    marginRight: 38,
    minHeight: 0,
    minWidth: 0,
    width: 'auto',
    padding: [[4, 0]],
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 400,
    opacity: 1,
    color: '#000000',
    textTransform: 'none',
    letterSpacing: 0,
    fontFamily: "'Segoe UI', 'Helvetica Neue', Helvetica, Arial, sans-serif",

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
  indicator: {
    backgroundColor: '#2158F5',
  },
}));
