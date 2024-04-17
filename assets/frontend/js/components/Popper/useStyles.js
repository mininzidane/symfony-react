import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  popper: {
    zIndex: 300,

    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      left: 0,
      transform: 'translate(0%, -50%) rotate(45deg)',
    },
    '&[x-placement*="top"] $arrow': {
      bottom: 0,
      left: 0,
      transform: 'translate(0%, 50%) rotate(45deg)',
    },
    '&[x-placement*="right"] $arrow': {
      left: 0,
      transform: 'translate(-50%, 0) rotate(45deg)',
    },
    '&[x-placement*="left"] $arrow': {
      right: 0,
      transform: 'translate(50%, 0) rotate(45deg)',
    },
  },
  arrow: {
    position: 'absolute',
    width: 10,
    height: 10,
    background: 'white',
  },
  paper: {
    maxWidth: 'calc(100vw - 10px * 2)',
    padding: 20,
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)',
  },
}));
