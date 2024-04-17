import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  modal: {
    gridTemplateRows: 'min-content 1fr',
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
      borderRadius: '0',
      maxHeight: '100%',
    },
  },
}));
