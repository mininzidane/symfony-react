import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    minHeight: 30,
    padding: [[4, 10, 4, 12]],
    backgroundColor: '#FFF',
    color: '#2158F5',
    border: '1px solid #2158F5',
    borderRadius: 20,
    transition: 'color .15s ease, background-color .15s ease, border-color .15s ease',
    cursor: 'pointer',

    '&.is-active': {
      backgroundColor: '#2158F5',
      color: '#FFF',

      '&:hover': {
        backgroundColor: '#5681F7',
        borderColor: '#5681F7',
      },

      '&:active': {
        backgroundColor: '#0D43DB',
        borderColor: '#0D43DB',
      },
    },

    '&:hover': {
      backgroundColor: '#2158F5',
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
  label: {
    ...mixins.font(12, 20, 400),
    whiteSpace: 'nowrap',
    margin: [[0, 8, 0, 6]],
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
    transform: 'rotate(90deg)',

    '&.is-active': {
      borderLeftColor: '#FFF',
      transform: 'scaleX(-1)',
    },
  },
  icon: {
    width: 13,

    '& path': {
      transition: 'fill .15s ease',
      fill: '#2158F5',
    },
    '&.is-active path': {
      fill: '#FFF',
    },
  },
}));
