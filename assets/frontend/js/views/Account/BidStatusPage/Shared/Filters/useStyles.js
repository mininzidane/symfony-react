import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    gap: '14px',

    [breakpoints.down('sm')]: {
      gridGap: 0,
    },
  },
  absolute: {
    position: 'absolute',
    top: -14,
    right: 0,
    transform: 'translateY(-100%)',
    zIndex: 30,

    [breakpoints.down('sm')]: {
      top: -30,
    },

    [breakpoints.down('xs')]: {
      right: 14,
    },
  },
  viewModeTogglerWrap: {
    height: 40,

    [breakpoints.down('sm')]: {
      height: 30,
    },

    '& button': {
      height: 40,

      [breakpoints.down('sm')]: {
        height: 30,
      },
    },
  },
}));
