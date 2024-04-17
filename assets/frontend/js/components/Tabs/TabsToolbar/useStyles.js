import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    minHeight: 28,
    position: 'relative',
    backgroundColor: 'inherit',
    overflow: 'visible',
  },
  scroller: {
    display: 'flex',
  },
  flexContainer: {
    [breakpoints.down('xs')]: {
      justifyContent: 'space-between',
    },
  },
  indicator: {
    backgroundColor: '#2158F5',
  },
  scrollButton: {
    display: 'none',
    opacity: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: -12,
    zIndex: 1,
    width: 12,

    '& ~ &': {
      right: -12,
      left: 'auto',
    },
  },
  scrollButtonVisible: {
    display: 'inline-flex',
  },
}));
