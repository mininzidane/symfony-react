import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  menuContainer: {
    position: 'absolute',
    left: 0,
    top: '100%',
    width: '100%',
  },
  wrap: {
    backgroundColor: '#1D1E20',
    height: 'calc(100vh - 100px)',
  },
  menu: {
    height: '100%',
    overflowY: 'scroll',
    overscrollBehavior: 'none',
    paddingBottom: 50,
    '&.is-hidden': {
      display: 'none',
    },
  },
  extraMenu: {
    height: '100%',
    overflowY: 'scroll',
    overscrollBehavior: 'none',
    position: 'relative',
    backgroundColor: '#0F0F0F',
    '&:before': {
      content: '""',
      height: '100%',
      width: '100%',
      backgroundColor: '#1D1E20',
      position: 'absolute',
      top: '-100%',
      zIndex: 1,
    },
    '&.is-hidden': {
      display: 'none',
    },
  },
  flag: {
    width: 24,
  },
}));
