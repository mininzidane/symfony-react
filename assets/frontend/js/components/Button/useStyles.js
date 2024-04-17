import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    ...mixins.flex('center', 'center'),
    width: '100%',
    maxWidth: '100%',
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
    borderRadius: 25,
    textTransform: 'uppercase',
    userSelect: 'none',
    transition: 'box-shadow .1s ease, background-color .2s ease',
    textDecoration: 'none',
    fontWeight: 700,
    textAlign: 'center',
    cursor: 'pointer',

    '&:hover': {
      textDecoration: 'none',
      boxShadow: '0 0 4px rgba(0, 0, 0, 0.2)',
    },

    '&:active': {
      textDecoration: 'none',
      boxShadow: 'none',
    },

    // Colors
    '&.is-blue': {
      color: '#ffffff',
      backgroundColor: '#2158F5',

      '&:hover': {
        backgroundColor: '#5681F7',
      },

      '&:active': {
        backgroundColor: '#0D43DB',
        boxShadow: 'inset 0px 2px 3px rgba(0, 0, 0, 0.25)',
      },
    },

    '&.is-blue-dark': {
      color: '#ffffff',
      backgroundColor: '#00548D',

      '&:hover': {
        backgroundColor: '#0091f3',
      },

      '&:active': {
        backgroundColor: '#00365a',
        boxShadow: 'inset 0px 2px 3px rgba(0, 0, 0, 0.25)',
      },
    },

    '&.is-white': {
      color: '#333333',
      backgroundColor: '#FFF',

      '&:hover': {
        backgroundColor: '#E5E5F2',
      },

      '&:active': {
        backgroundColor: '#C9CFE5',
        boxShadow: 'inset 0px 2px 3px rgba(0, 0, 0, 0.25)',
      },
    },

    '&.is-yellow': {
      color: '#000000',
      backgroundColor: '#FDB81E',

      '&:hover': {
        backgroundColor: '#FED883',
      },

      '&:active': {
        backgroundColor: '#F2A700',
        boxShadow: 'inset 0px 2px 3px rgba(0, 0, 0, 0.25)',
      },
    },

    '&.is-green': {
      color: '#ffffff',
      backgroundColor: '#4A9029',

      '&:hover': {
        backgroundColor: '#60A03D',
      },

      '&:active': {
        backgroundColor: '#488726',
        boxShadow: 'inset 0px 2px 3px rgba(0, 0, 0, 0.25)',
      },
    },

    '&.is-red': {
      color: '#ffffff',
      backgroundColor: '#B20000',

      '&:hover': {
        backgroundColor: '#EE2B2B',
      },

      '&:active': {
        backgroundColor: '#8D0000',
        boxShadow: 'inset 0px 2px 3px rgba(0, 0, 0, 0.25)',
      },
    },

    '&.is-green-bright': {
      color: '#FFFFFF',
      backgroundColor: '#00C73C',

      '&:hover': {
        backgroundColor: '#14D14D',
      },

      '&:active': {
        backgroundColor: '#009D2F',
        boxShadow: 'inset 0px 2px 3px rgba(0, 0, 0, 0.25)',
      },
    },

    '&.is-black': {
      color: '#FFFFFF',
      backgroundColor: '#000000',

      '&:hover': {
        backgroundColor: '#2E2E2E',
      },

      '&:active': {
        backgroundColor: '#000000',
      },
    },

    '&.is-gray-hover': {
      color: '#2158F5',
      backgroundColor: 'transparent',
      boxShadow: 'none',

      '&:hover': {
        backgroundColor: '#C0C0C0',
      },

      '&:active': {
        color: '#FFFFFF',
        backgroundColor: '#747474',
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

    '&.is-xs': {
      ...mixins.font(12, 14),
      padding: [[5, 12]],
    },

    // Shadow
    '&.is-shadowless': {
      boxShadow: 'none',
    },

    // Case
    '&.is-regular-case': {
      textTransform: 'none',
    },

    '&.is-capitalize': {
      textTransform: 'capitalize',
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
    '&.is-nowrap': {
      whiteSpace: 'nowrap',
    },

    // Loading state
    '&.is-loading': {
      pointerEvents: 'none',
      boxShadow: '0 1px 0 rgba(0, 0, 0, 0.16)',

      // Copy active colors
      '&.is-blue': {
        backgroundColor: '#0D43DB',
      },

      '&.is-blue-dark': {
        backgroundColor: '#00365A',
      },

      '&.is-yellow': {
        backgroundColor: '#F2A700',
      },

      '&.is-green': {
        backgroundColor: '#488726',
      },
    },

    // Disabled state
    '&.is-disabled': {
      color: '#BDBDBD !important',
      backgroundColor: '#E0E0E0 !important',
      cursor: 'not-allowed',
      pointerEvents: 'none',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',

      '&.is-disabled-dark-gray': {
        backgroundColor: '#BDBDBD !important',
        color: '#E0E0E0 !important',
      },
    },
  },
}));
