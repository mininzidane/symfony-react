import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    ...mixins.flex('center', 'center'),
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    zIndex: '999999 !important',
  },
  container: ({ hasDesktopExternalCloseButton }) => ({
    display: 'grid',
    gridTemplateRows: 'min-content 1fr',
    maxHeight: 'calc(100vh - 28px)',
    maxWidth: `calc(100vw - ${hasDesktopExternalCloseButton ? 100 : 28}px)`,
    outline: 'none',
    boxShadow: '0 2px 3px rgba(0, 0, 0, .25)',

    [breakpoints.down('sm')]: {
      maxWidth: 'calc(100vw - 28px)',
    },
  }),
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  externalCloseButton: {
    position: 'absolute',
    top: 25,
    right: 25,

    [breakpoints.down('md')]: {
      top: 15,
      right: 15,
    },

    '&:hover': {
      opacity: 0.75,
    },

    '& img': {
      display: 'block',
    },
  },
}));
