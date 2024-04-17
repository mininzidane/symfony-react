import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',

    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  modal: {
    ...mixins.scrollbar(),
    backgroundColor: '#FFFFFF',
    position: 'relative',
    boxShadow: 'rgba(0, 0, 0, 0.6) 0px 0px 8px',
    borderRadius: 4,
    maxWidth: 'calc(100vw - 8px)',
    maxHeight: 'calc(100vh - 8px)',
    overflowY: 'auto',
  },
  cross: {
    position: 'absolute',
    top: 14,
    right: 14,
    opacity: 0.7,

    [breakpoints.down('sm')]: {
      opacity: 1,
    },

    '&:hover': {
      opacity: 1,
    },
  },
  form: {
    maxWidth: 530,
    width: '100%',

    [breakpoints.down('sm')]: {
      maxWidth: 'none',
    },
  },
  description: {
    maxWidth: 320,
    width: '100%',

    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));
