import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    minHeight: 40,
    padding: [[5, 14]],
    backgroundColor: '#EEF2FF',
    color: '#2158F5',
    border: '1px solid #2158F5',
    borderRadius: 20,
    transition: 'color .15s ease, background-color .15s ease, border-color .15s ease',
    cursor: 'pointer',

    [breakpoints.down('sm')]: {
      minHeight: 30,
      padding: [[4, 10, 4, 12]],
      backgroundColor: '#2158F5',
      color: '#FFF',

      '&:hover': {
        backgroundColor: '#4878FF',
        borderColor: '#4878FF',
        color: '#FFF',
      },

      '&:active': {
        boxShadow: 'inset 0px 1px 2px rgba(0,0,0,.25)',
        backgroundColor: '#0D43DB',
        borderColor: '#2158F5',
      },
    },

    '&.is-active': {
      backgroundColor: '#2158F5',
      color: '#FFF',

      '&:hover': {
        backgroundColor: '#4878FF',
        borderColor: '#4878FF',
        color: '#FFF',
      },

      '&:active': {
        boxShadow: 'inset 0px 1px 2px rgba(0,0,0,.25)',
        backgroundColor: '#0D43DB',
        borderColor: '#2158F5',
      },
    },

    '&:hover': {
      backgroundColor: '#4878FF',
      borderColor: '#4878FF',
      color: '#FFF',

      '& $triangle': {
        borderLeftColor: '#FFF',
      },

      '& $icon': {
        '& path': {
          fill: '#FFF',
        },
      },
    },

    '&:active': {
      backgroundColor: '#0D43DB',
      borderColor: '#0D43DB',
      color: '#FFF',

      '& $triangle': {
        borderLeftColor: '#FFF',
      },

      '& $icon': {
        '& path': {
          fill: '#FFF',
        },
      },
    },
  },
  loading: {
    pointerEvents: 'none',
    zIndex: 100,
  },
  triangle: {
    position: 'relative',
    top: 1,
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderWidth: '4px 0 4px 4px ',
    borderColor: 'transparent transparent transparent #2158F5',
    transition: 'border .15s ease',

    [breakpoints.down('md')]: {
      transform: 'rotate(90deg)',
    },

    [breakpoints.down('sm')]: {
      borderLeftColor: '#FFF',
    },

    '&.is-active': {
      borderLeftColor: '#FFF',
      transform: 'scaleX(-1)',
    },
  },
  label: {
    ...mixins.font(16, 20, 400),
    paddingLeft: 2,
    whiteSpace: 'nowrap',
    margin: [[0, 8, 0, 6]],

    [breakpoints.down('sm')]: {
      fontSize: 12,
      paddingLeft: 0,
    },
  },
  icon: {
    width: 14,

    [breakpoints.down('sm')]: {
      width: 13,
    },

    '& path': {
      transition: 'fill .15s ease',
      fill: '#2158F5',
    },

    '&.is-active path': {
      fill: '#FFF',
    },

    [breakpoints.down('sm')]: {
      '& path': {
        fill: '#FFF !important',
      },
    },
  },
}));
