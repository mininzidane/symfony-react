import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    position: 'relative',
    borderStyle: 'solid',
    display: 'inline-block',
    flexShrink: '0',
    margin: '0',
    fontSize: '0',
    borderRadius: '50%',
    pointerEvents: 'none',
    willChange: 'transform',
    animation: 'Spin 650ms infinite linear',

    // Colors
    '&.is-blue': {
      borderColor: '#2158F5',
      borderLeftColor: 'rgba(13, 93, 184, .4)',
    },

    '&.is-white': {
      borderColor: '#FFFFFF',
      borderLeftColor: 'rgba(255, 255, 255, .4)',
    },

    '&.is-gray': {
      borderColor: '#CCCCCC',
      borderLeftColor: '#e8e8e8',
    },

    '&.is-gray-dark': {
      borderColor: '#6A6A6A',
      borderLeftColor: '#CCCCCC',
    },

    '&.is-black': {
      borderColor: '#000000',
      borderLeftColor: 'rgba(0, 0, 0, .4)',
    },

    '&.is-yellow': {
      borderColor: '#E6CD4F',
      borderLeftColor: '#F4EAB5',
    },

    // Position
    '&.is-centered': {
      position: 'absolute',
      top: '50%',
      left: '50%',
    },
  },
}));
