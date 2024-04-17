import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, isRtl, mixins }) => ({
  root: {
    paddingTop: 35,
    paddingBottom: 30,
    overflow: 'hidden',
    [breakpoints.down('md')]: {
      paddingTop: '24px',
      paddingBottom: '24px',
    },
  },
  header: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '400',
    fontSize: '32px',
    lineHeight: '43px',
    margin: '0 auto auto',
    [breakpoints.down('md')]: {
      fontSize: '24px',
      lineHeight: '32px',
    },
    [breakpoints.down('sm')]: {
      fontSize: '20px',
      lineHeight: '27px',
    },
  },
  control: {
    display: 'flex',
    [breakpoints.down('sm')]: {
      display: 'none',
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
    height: '100%',
    margin: [[20, 0]],

    background: '#FFFFFF',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
    padding: '20px 18px 28px 18px',

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
  bullets: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bullet: {
    ...mixins.extraHitbox(6),
    position: 'relative',
    width: '6px',
    height: '6px',
    background: '#C4C4C4',
    borderRadius: '50%',
    margin: '4px',
    display: 'block',
    cursor: 'pointer',
  },
  activeBullet: {
    width: '6px',
    height: '6px',
    background: '#2158F5',
    borderRadius: '50%',
    margin: '4px',
    display: 'block',
  },
  review: {
    '& > div': {
      justifyContent: 'flex-start',
      textAlign: 'left',
    },
  },
}));
