import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    borderRadius: 25,
    textTransform: 'uppercase',
    userSelect: 'none',
    transition: 'background-color .2s ease',
    textDecoration: 'none !important',
    fontWeight: '700',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    backgroundColor: 'transparent',

    // Colors
    '&.is-blue': {
      color: '#2158F5',

      '&:hover': {
        backgroundColor: 'rgb(13, 93, 184, .1)',
      },

      '&:active': {
        backgroundColor: 'rgb(13, 93, 184, .3)',
      },
    },

    '&.is-black': {
      color: '#000000',

      '&:hover': {
        backgroundColor: 'rgb(0, 0, 0, .1)',
      },

      '&:active': {
        backgroundColor: 'rgb(0, 0, 0, .3)',
      },
    },

    // Sizes
    '&.is-lg': {
      ...mixins.font(18, 20),
      padding: [[15, 32]],
    },

    '&.is-md': {
      ...mixins.font(16, 20),
      padding: [[10, 24]],
    },

    '&.is-sm': {
      ...mixins.font(14, 16),
      padding: [[7, 14]],
    },

    // Case
    '&.is-regular-case': {
      textTransform: 'none',
    },

    // Loading state
    '&.is-loading': {
      pointerEvents: 'none',

      // Copy active colors
      '&.is-blue': {
        backgroundColor: 'rgb(13, 93, 184, .1)',
      },

      '&.is-black': {
        backgroundColor: 'rgb(0, 0, 0, .1)',
      },
    },

    // Disabled state
    '&.is-disabled': {
      color: 'rgb(0, 0, 0, .3) !important',
      backgroundColor: 'transparent !important',
      cursor: 'not-allowed',
    },
  },
}));
