import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  imageHD: {
    position: 'absolute',
    top: 20,
    left: 25,
    zIndex: 1,

    '& img': {
      objectFit: 'cover',
    },

    [breakpoints.down('md')]: {
      left: 15,

      '& img': {
        height: 30,
        width: 50,
      },
    },
  },
  image: {
    '& img': {
      objectFit: 'cover',
    },
  },
}));
