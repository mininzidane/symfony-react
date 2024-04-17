import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    maxHeight: 'calc(100vh - 28px)',
  },
  photoModalBody: {
    maxWidth: 'calc(100vw - 28px)', // 2 x 14px modal side paddings

    '& img': {
      maxHeight: 'calc(100vh - 110px)', // 2 x 14px vertical modal paddings + 42 header height + 2 x 20px modal content vertical paddings
    },
  },
}));
