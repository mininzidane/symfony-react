export default ({ breakpoints }) => ({
  root: {
    background: '#DDDDDD',
    minHeight: 400,
    padding: [[40, 0, 60, 0]],

    [breakpoints.down('sm')]: {
      padding: [[40, 0, 30, 0]],
    },
  },
  title: {
    fontSize: 32,
    lineHeight: '43px',
    textAlign: 'center',
    marginBottom: 30,

    [breakpoints.down('sm')]: {
      fontSize: 24,
      lineHeight: '32px',
      marginBottom: 20,
    },
  },
  stars: {
    color: '#DE722C',
  },
  rating: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 20,
  },
  swiper: {
    position: 'relative',
    maxWidth: 750,
    padding: [[0, 25]],
    margin: 'auto',
  },
  wrapper: {
    alignItems: 'center',
  },
  arrow: {
    position: 'absolute',
    height: 29,
    top: '50%',
    outline: 'none',
    cursor: 'pointer',

    [breakpoints.down('md')]: {
      height: 15,
    },
  },
  arrowLeft: {
    transform: 'translate(50%, -50%) rotate(180deg)',
    left: -40,

    [breakpoints.down('md')]: {
      left: 0,
    },
  },
  arrowRight: {
    right: -40,
    transform: 'translate(-50%, -50%)',

    [breakpoints.down('md')]: {
      right: 0,
    },
  },
  bullets: {
    marginTop: 36,
    display: 'flex',
    justifyContent: 'center',

    [breakpoints.down('sm')]: {
      marginTop: 20,
    },
  },
  icon: {},
  footer: {},
  name: {},
  location: {},
  bullet: {
    outline: 'none',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',

    '&:not(:last-child)': {
      marginRight: 30,

      [breakpoints.down('sm')]: {
        marginRight: 15,
      },
    },

    width: 45,
    maxWidth: 45,

    [breakpoints.down('sm')]: {
      width: 24,
      maxWidth: 24,
    },

    '& $icon': {
      height: 45,
      width: 45,
      borderRadius: '50%',

      [breakpoints.down('sm')]: {
        height: 24,
        width: 24,
      },
    },

    '& $footer': {
      whiteSpace: 'nowrap',
      opacity: 0,
      marginTop: 26,
      fontSize: 18,
      lineHeight: '24px',
      textAlign: 'center',

      [breakpoints.down('sm')]: {
        marginTop: 14,
        fontSize: 12,
        lineHeight: '16px',
      },

      '& $name': {
        fontWeight: 700,
      },

      '& $location': {
        fontWeight: 100,
      },
    },
  },
  activeBullet: {
    '& $icon': {
      transition: 'transform .3s',
      transform: 'scale(1.7)',
    },

    '& $footer': {
      opacity: 1,
      transition: 'opacity .15s .3s',
    },
  },
  review: {
    alignSelf: 'center',
    background: 'white',
    boxShadow: 'inset 0px -3px 0px #234C79',
    borderRadius: 4,
    padding: [[25, 15]],
    textAlign: 'center',
    fontSize: 18,
    lineHeight: '22px',

    [breakpoints.down('sm')]: {
      fontSize: 14,
      lineHeight: '20px',
    },
  },
});
