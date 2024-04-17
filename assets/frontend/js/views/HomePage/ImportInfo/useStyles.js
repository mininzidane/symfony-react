import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    paddingTop: 36,
    paddingBottom: 60,
    backgroundPositionY: 0,
    backgroundPositionX: 'center',

    '&.is-empty': {
      backgroundPositionX: 'calc(50% + 180px)',
    },

    [breakpoints.down('lg')]: {
      backgroundPositionX: 'calc(50% + 40px)',

      '&.is-empty': {
        backgroundPositionX: 'calc(50% + 180px)',
      },
    },

    [breakpoints.down('lg')]: {
      paddingLeft: 15,
      paddingRight: 15,
    },

    [breakpoints.down('md')]: {
      maxWidth: 768,
      backgroundImage: 'none !important',
    },

    [breakpoints.down('sm')]: {
      padding: [[24, 0, 32]],
    },
  },
}));
