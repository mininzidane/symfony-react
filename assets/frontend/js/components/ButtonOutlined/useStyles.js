import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    borderRadius: 25,
    textTransform: 'uppercase',
    userSelect: 'none',
    transition: 'background-color .2s ease, box-shadow .2s ease, color .2s ease',
    textDecoration: 'none !important',
    fontWeight: 700,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    backgroundColor: 'transparent',
    boxShadow: 'inset 0 0 0 2px #2158F5',

    // Colors
    '&.is-blue': {
      color: '#2158F5',
      backgroundColor: 'rgba(33, 88, 245, 0.05)',

      '&:hover': {
        color: '#FFFFFF',
        backgroundColor: '#2158F5',
      },

      '&:active': {
        color: '#FFFFFF',
        backgroundColor: '#0D43DB',
        boxShadow: 'inset 0px 2px 3px rgba(0, 0, 0, 0.25)',
      },

      '&.is-thin-border': {
        boxShadow: 'inset 0 0 0 1px #2158F5',

        '&:active': {
          boxShadow: 'inset 0 0 0 1px #2158F5',
        },
      },
    },

    '&.is-white': {
      color: '#FFFFFF',
      boxShadow: 'inset 0 0 0 2px #FFFFFF',

      '&:hover': {
        color: '#000000',
        backgroundColor: '#FFFFFF',
      },

      '&.is-thin-border': {
        boxShadow: 'inset 0 0 0 1px #FFFFFF',
      },
    },

    '&.is-yellow': {
      color: '#000000',
      boxShadow: 'inset 0 0 0 2px #e5e5e5',

      '&:hover': {
        backgroundColor: '#FED883',
        boxShadow: 'none',
      },

      '&:active': {
        backgroundColor: '#F2A700',
        boxShadow: 'inset 0px 2px 3px rgba(0, 0, 0, 0.25)',
      },
    },

    '&.is-black': {
      color: '#333 !important',
      boxShadow: 'inset 0 0 0 2px #333',

      '&:hover, &:active': {
        backgroundColor: '#EEE',
      },

      '&.is-thin-border': {
        boxShadow: 'inset 0 0 0 1px #333',
      },
    },

    '&.is-background-white': {
      backgroundColor: 'white',
    },

    '&.is-background-transparent': {
      backgroundColor: 'transparent',
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

    // Corners radius
    '&.is-squared': {
      borderRadius: 4,
    },

    // Width
    '&.is-inline': {
      display: 'inline-flex',
      width: 'auto',
    },

    // Word wrap
    '&.is-nowrap > span': {
      maxWidth: '100%',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },

    // Loading state
    '&.is-loading': {
      pointerEvents: 'none',

      '&.is-background-white': {
        color: '#2158F5 !important',
        backgroundColor: '#FFF !important',
      },
    },

    // Disabled state
    '&.is-disabled': {
      color: '#BDBDBD !important',
      backgroundColor: 'transparent !important',
      boxShadow: 'inset 0 0 0 1px #E0E0E0 !important',
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
  },
}));
