import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    animation: `loadingContent infinite linear`,
    zIndex: 20,
    pointerEvents: 'none',
    transform: 'rotate(20deg)',
  },
}));
