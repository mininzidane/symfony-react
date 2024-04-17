import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    position: 'relative',
    backgroundColor: '#C0C6C6',
    overflow: 'hidden',

    '&.is-lg': {
      [breakpoints.down('lg')]: {
        display: 'none',
      },
    },

    [breakpoints.down('lg')]: {
      paddingBottom: '46%',
    },

    [breakpoints.down('sm')]: {
      paddingBottom: '56%',
    },
  },
  image: {
    position: 'absolute',
    objectFit: 'cover',
    height: '100%',
    width: '100%',
    zIndex: 2,
  },
}));
