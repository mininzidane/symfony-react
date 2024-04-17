import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    height: 56,
    width: '100vw',
    padding: [[0, 14]],
    zIndex: 4000,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottom: '1px solid #E0E0E0',
    transform: 'translateY(100%)',
    boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.15)',
    transition: 'transform .25s ease',

    '&.is-shown': {
      transform: 'translateY(0)',
    },
  },
  watchlist: {
    position: 'absolute',
    bottom: 'calc(100% + 10px)',
    right: 14,
  },
  bidComponents: {
    display: 'flex',
    justifyContent: 'space-between',

    '& > div': {
      width: 'calc(50% - 3px)',
    },
  },
  authButtons: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: 12,
  },
}));
