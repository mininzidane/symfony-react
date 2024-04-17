import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    flexGrow: 1,
    left: '0',
    width: '100%',
    bottom: '0',
    height: '56px',
    display: 'flex',
    padding: 0,
    zIndex: '300',
    position: 'fixed',
    boxShadow: '0px -2px 4px rgb(0 0 0 / 15%)',
    transition: 'transform .25s ease',
    alignItems: 'center',
    borderBottom: '1px solid #E0E0E0',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  indicatorMui: {
    display: 'none',
  },
  indicator: {
    position: 'absolute',
    top: 0,
    width: '25vw',
    height: 2,
    backgroundColor: '#2158F5',
    transition: 'opacity .15s ease .1s, transform .1s ease',
    opacity: 1,
    visibility: 'visible',

    '&.tab-': {
      opacity: 0,
      visibility: 'hidden',
    },

    '&.tab-watchlist': {
      transform: 'translateX(0)',
    },

    '&.tab-bids': {
      transform: 'translateX(25vw)',
    },

    '&.tab-buyerPower': {
      transform: 'translateX(50vw)',
    },

    '&.tab-account': {
      transform: 'translateX(75vw)',
    },
  },
  authButtons: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: 12,
    width: '100%',
    padding: [[0, 14]],
  },
}));
