import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  '@global': {
    '.page-header': {
      position: 'sticky',
      top: 0,
      zIndex: 4002,
    },
  },
  root: {
    backgroundColor: '#2158F5',
    boxShadow: '0 2px 3px rgba(0, 0, 0, .25)',
    transition: 'transform .25s ease',
    transform: 'translate3d(0, 0, 0)',
    zIndex: 301,
    position: 'relative',

    '&.is-minimized': {
      transform: 'translate3d(0, -40px, 0)',
    },
  },
  mainPanel: {
    ...mixins.flex('between', 'center'),
    position: 'relative',
    flexWrap: 'nowrap',
    height: 60,
    backgroundColor: '#2158F5',
    padding: [[0, 30]],
    transition: 'transform .15s ease',
    transform: 'translate3d(0, 0, 0)',
    zIndex: 20,

    '&.is-minimized': {
      transform: 'translate3d(0, -5px, 0)',
    },

    [breakpoints.down('md')]: {
      padding: [[0, 14]],
    },

    [breakpoints.down('sm')]: {
      height: 52,
    },
  },
  mobileSearchPanel: {
    position: 'relative',
    height: 48,
    padding: [[0, 14]],
  },
  logosWrap: {
    ...mixins.flex(null, 'center'),
    flexShrink: 0,
    height: '100%',
  },
  accountSection: {
    ...mixins.flex(null, 'center'),
    flex: 'none',
    position: 'relative',
  },
  contacts: {
    display: 'flex',
    alignItems: 'center',
  },
}));
