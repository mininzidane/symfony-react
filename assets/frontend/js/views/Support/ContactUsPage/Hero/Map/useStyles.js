import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    width: '58%',
    overflow: 'hidden',
    touchAction: 'none',
    transform: 'translateZ(0)',
  },
  mapWrap: {
    position: 'relative',
    transition: 'transform .2s ease',
    display: 'grid',
    placeItems: 'center',
    height: '100%',

    '& circle': {
      transition: 'all .2s ease',
    },
  },
  map: {
    position: 'absolute',
    cursor: 'grab',

    '&.is-dragging': {
      cursor: 'grabbing',
    },

    '& circle': {
      fill: '#2158F5',
      stroke: 'white',
      pointerEvents: 'none',
    },

    '& path': {
      fill: '#B7CEDD',
      stroke: '#E0E0E0',
      strokeWidth: '0.1',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      transition: 'all .2s ease',

      '&.abm-country': {
        stroke: '#2158F5',
        strokeWidth: 0.25,
        cursor: 'pointer',

        '&:hover': {
          fill: '#A1B4EB',
        },

        '&.is-active': {
          fill: '#2158F5',
        },
      },

      '&.map-label': {
        fill: '#333',
      },
    },
  },
  controls: {
    position: 'absolute',
    top: '50%',
    right: 28,
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: 10,
    transform: 'translateY(-50%)',

    [breakpoints.down('lg')]: {
      right: 14,
    },
  },
  control: {
    width: 40,
    height: 40,
    background: '#FFFFFF',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
    borderRadius: 5,
    display: 'grid',
    placeItems: 'center',
    transition: 'all .2s ease',

    '& rect': {
      fill: '#2158F5',
      transition: 'all .2s ease',
    },

    '&:hover': {
      backgroundColor: '#2158F5',
      boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',

      '& rect': {
        fill: '#FFF',
      },
    },

    '&:active': {
      backgroundColor: '#0C46ED',
      boxShadow: 'inset 0px 1px 2px rgba(0, 0, 0, 0.15)',

      '& rect': {
        fill: '#FFF',
      },
    },

    '&.is-disabled': {
      backgroundColor: '#E0E0E0',
      boxShadow: 'none',
      pointerEvents: 'none',

      '& rect': {
        fill: '#BDBDBD',
      },
    },

    [breakpoints.down('lg')]: {
      width: 32,
      height: 32,

      '& svg': {
        transform: 'scale(0.7)',
      },
    },
  },
}));
