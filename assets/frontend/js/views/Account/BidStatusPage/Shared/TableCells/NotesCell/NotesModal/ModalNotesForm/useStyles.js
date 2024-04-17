import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    overflow: 'auto',
  },
  modal: {
    gridTemplateRows: 'min-content 1fr min-content',
    [breakpoints.down('sm')]: {
      maxWidth: '100vw',
      maxHeight: '100vh',
      minHeight: '100%',
      width: '100vw!important',
    },
  },
  header: {
    [breakpoints.down('sm')]: {
      borderRadius: 0,
    },
  },
  body: {
    maxHeight: '600px',
    minHeight: '240px',
    [breakpoints.down('sm')]: {
      maxHeight: '100%',
      minHeight: 'auto',
    },
  },
  footer: {
    width: '100%',
    backgroundColor: '#F6F6F6',
    borderTop: 'none',
    overflow: 'hidden',
    [breakpoints.down('sm')]: {
      borderRadius: 0,
    },
  },
}));
