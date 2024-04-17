import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: 1920,
    padding: [[0, 30]],

    '&.is-ultra-wide': {
      maxWidth: 'none',
    },

    [breakpoints.down('md')]: {
      padding: [[0, 14]],
    },
  },
  hasBackgroundImage: {
    backgroundSize: 'auto 100%',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',

    [breakpoints.down('sm')]: {
      backgroundSize: 'cover',
    },
  },
}));
