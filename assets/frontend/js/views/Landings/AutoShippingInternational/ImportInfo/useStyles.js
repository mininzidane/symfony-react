import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[36, 0, 60]],
    backgroundPositionY: 0,
    backgroundPositionX: 0,
    backgroundSize: 'cover',

    [breakpoints.down('lg')]: {
      paddingLeft: 15,
      paddingRight: 15,
    },

    [breakpoints.down('md')]: {
      maxWidth: 768,
      backgroundImage: 'none !important',
    },

    [breakpoints.down('sm')]: {
      padding: [[24, 14, 32]],
    },
  },
}));
