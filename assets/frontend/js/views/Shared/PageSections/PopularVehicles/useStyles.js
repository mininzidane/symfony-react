import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[35, 0]],
    backgroundColor: '#F1F1F8',
    width: '100%',
    overflow: 'hidden',

    '&.is-loading': {
      minHeight: 656,

      [breakpoints.down('lg')]: {
        minHeight: 594,
      },

      [breakpoints.down('md')]: {
        minHeight: 400,
      },

      [breakpoints.down('sm')]: {
        minHeight: 450,
      },
    },

    '&.is-loading-inline': {
      minHeight: 466,
      [breakpoints.down('lg')]: {
        minHeight: 430,
      },

      [breakpoints.down('md')]: {
        minHeight: 400,
      },

      [breakpoints.down('sm')]: {
        minHeight: 450,
      },
    },

    [breakpoints.down('sm')]: {
      padding: [[24, 0]],
    },
  },
  container: {
    [breakpoints.down('lg')]: {
      paddingLeft: 15,
      paddingRight: 15,
    },
    [breakpoints.down('md')]: {
      maxWidth: 768,
    },
  },
}));
