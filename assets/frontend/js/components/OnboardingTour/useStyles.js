import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999999,
  },
  overlay: {
    position: 'absolute',
    transition: 'all .2s ease-out',
    boxShadow: 'rgb(0 0 0 / 50%) 0px 0px 0px 5000px',
    borderRadius: 4,

    // fix for safari 14
    width: 1,
    height: 1,
    top: 0,
    left: 0,
  },

  // desktop
  paper: {
    width: 375,
    padding: 0,
  },
  arrow: {
    width: 15,
    height: 15,
    background: '#2158F5',
  },
  noAnchor: {
    ...mixins.centered(),
    position: 'fixed',
    width: 375,
  },

  // mobile
  mobile: {
    bottom: 0,
    width: '100%',
    position: 'fixed',
  },
}));
