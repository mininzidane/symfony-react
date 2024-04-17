import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  accountMenuTrigger: {
    ...mixins.extraHitbox(),
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    outline: 'none',
    padding: 6,
    marginLeft: -6,
    borderRadius: 2,
  },
  isAccountMenuOpen: {
    [breakpoints.down('lg')]: {
      backgroundColor: 'rgba(255, 255, 255, .2)',
    },
  },
  userIcon: {
    position: 'relative',
    width: 24,
    height: 24,
  },
  userSymbol: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    width: 24,
    height: 24,
    borderRadius: '50%',
    fontSize: '14px',
    color: '#2158F5',
    backgroundColor: 'rgba(255, 255, 255, .75)',
    textTransform: 'uppercase',
  },
  arrow: {
    display: 'flex',
    marginLeft: 6,

    '& svg': {
      display: 'block !important',
    },
  },
  bidStatusSeparator: {
    display: 'block',
    width: '1px',
    height: '10px',
    background: 'rgba(255, 255, 255, 0.4)',
    margin: [[0, 3]],
  },
  bidStatusValueWrap: {
    display: 'flex',
    alignItems: 'center',
  },
  section: {
    marginRight: 30,

    '@media(max-width: 1366px)': {
      marginRight: 20,
      height: 24,
    },

    [breakpoints.down('sm')]: {
      marginRight: 0,
    },
  },
  link: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    textDecoration: 'none !important',

    '&:hover svg': {
      '&:nth-child(1)': {
        display: 'none',
      },

      '&:nth-child(2)': {
        display: 'block',
      },
    },
  },
  icon: {
    position: 'relative',
    width: 24,
    height: 24,

    '& svg': {
      display: 'none',
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',

      '&:nth-child(1)': {
        display: 'block',
      },
    },
  },
  linkText: {
    color: '#fff',
    marginLeft: 7,
    marginBottom: 3,
    textDecoration: 'none',
  },
  caption: {
    fontSize: 12,
    textAlign: 'left',
    lineHeight: '14px',
  },
  value: {
    lineHeight: '14px',
    fontSize: 12,
    fontWeight: 700,
  },
  badge: {
    position: 'absolute',
    top: -4,
    left: 15,
    padding: [[0, 3]],
    height: 12,
    minWidth: 12,
    backgroundColor: '#A72820',
    borderRadius: 1000,
    textAlign: 'center',
    fontSize: 8,
    lineHeight: '12px',
    color: 'white',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.15)',
  },
}));
