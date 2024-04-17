import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    width: 20,
    height: 20,
    borderRadius: '50%',
    backgroundColor: '#C4C4C4',
    zIndex: 21,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    [breakpoints.down('sm')]: {
      width: 14,
      height: 14,
    },

    '&.is-completed': {
      backgroundColor: '#2158F5',
    },

    '&.is-done': {
      backgroundColor: '#4A9029',

      '&:last-child': {
        width: 36,
        height: 36,
        boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',

        [breakpoints.down('sm')]: {
          width: 20,
          height: 20,
        },

        '& img': {
          width: 10,
        },

        '&::after': {
          content: '""',
          position: 'absolute',
          width: 48,
          height: 48,
          border: '1px solid rgba(74, 144, 41, 0.5)',
          borderRadius: '50%',

          [breakpoints.down('sm')]: {
            display: 'none',
          },
        },
      },
    },

    '&.is-active': {
      width: 36,
      height: 36,
      boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',

      [breakpoints.down('sm')]: {
        width: 20,
        height: 20,

        '& img': {
          display: 'none',
        },
      },

      '&::after': {
        content: '""',
        position: 'absolute',
        width: 48,
        height: 48,
        border: '1px solid rgba(33, 88, 245, 0.5)',
        borderRadius: '50%',

        [breakpoints.down('sm')]: {
          display: 'none',
        },
      },
    },
  },
}));
