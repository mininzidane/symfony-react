import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    alignItems: 'center',

    '& img': {
      maxHeight: 50,
      maxWidth: '30%',

      [breakpoints.down('sm')]: {
        maxHeight: 40,
      },
    },

    '& .img--copart': {
      maxWidth: '161px',

      [breakpoints.down('sm')]: {
        maxWidth: '141px',
      },
    },
  },
  greyscale: {
    '& img:not(:hover)': {
      filter: 'grayscale(100%)',
    },
  },
}));
