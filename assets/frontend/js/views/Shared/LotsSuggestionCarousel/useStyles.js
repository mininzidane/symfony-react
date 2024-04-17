import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, isRtl }) => ({
  root: {
    [breakpoints.down('sm')]: {
      marginLeft: 'calc(50% - 50vw)',
      width: '100vw',
      overflow: 'hidden',
    },
  },
  container: {
    [breakpoints.up('md')]: {
      padding: 0,
    },
  },
  swiper: {
    margin: [[0, -15]],
    padding: [[0, 15]],

    [breakpoints.down('lg')]: {
      margin: [[0, -10]],
      padding: [[0, 10]],
    },

    [breakpoints.down('sm')]: {
      overflow: 'visible',
    },
  },
  navigation: {
    display: 'grid',
    placeContent: 'center',
    border: '1px solid #828282',
    outline: 'none',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all .15s ease',
    width: 30,
    height: 30,
    borderRadius: 25,
    transform: `scaleX(${isRtl ? -1 : 1})`,

    "&:not([role='button'])": {
      display: 'none',
    },

    '& > img': {
      width: 10,
      height: 10,
    },

    '&:hover': {
      background: '#2158F5',
      borderColor: '#2158F5',

      '& path': {
        fill: '#FFF',
      },
    },
  },
  navigationDisabled: {
    background: 'transparent',
    pointerEvents: 'none',
    backgroundColor: 'transparent',
    opacity: 0.5,
  },
  navigationHidden: {
    display: 'none',
  },
  prev: {},
  next: {
    transform: `rotate(${isRtl ? 0 : 180}deg)`,
    marginLeft: 10,
  },
  slide: {
    height: 'auto',
    margin: [[20, 0]],

    '& > div': {
      minHeight: '100%',
    },

    [breakpoints.down('sm')]: {
      margin: [[12, 0]],
    },

    [breakpoints.down('sm')]: {
      width: '280px !important',
    },
  },
  vehicleCard: {
    [breakpoints.down('sm')]: {
      borderRadius: '4px !important',

      '&:before': {
        borderRadius: '4px !important',
      },
    },
  },
}));
