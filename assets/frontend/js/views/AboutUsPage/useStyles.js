import { makeStyles } from '@material-ui/core/styles';
import bg from './img/bg.jpg';
import abmBg from './img/abm-bg.jpg';
import abmBgLarge from './img/abm-bg-large.jpg';

export default makeStyles(({ breakpoints }) => ({
  promo: {
    color: '#fff',
    background: `#233984 url("${bg}") center center no-repeat`,
    minHeight: 370,
    textAlign: 'center',
    padding: [[20, 0]],

    [breakpoints.up('lg')]: {
      background: `#233984 url("${bg}") center center no-repeat`,
      backgroundSize: 'cover',
    },
  },
  title: {
    fontWeight: 700,

    textAlign: 'center',
    color: '#fff',
    fontSize: 39,
    lineHeight: '52px',
    margin: [[5, 0]],
    textTransform: 'unset',

    [breakpoints.down('sm')]: {
      fontSize: 24,
      lineHeight: '32px',
    },
  },
  subTitle: {
    fontWeight: 300,
    fontSize: 24,
    lineHeight: '32px',
    marginBottom: 15,
    maxWidth: 970,
    margin: [[0, 'auto']],

    [breakpoints.down('sm')]: {
      fontSize: 18,
      lineHeight: '24px',
      marginBottom: 20,
    },

    '& + $desc:before': {
      content: '""',
      width: 110,
      height: 1,
      backgroundColor: '#fff',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      margin: [[0, 'auto']],
    },
  },
  desc: {
    fontSize: 16,
    lineHeight: '24px',
    position: 'relative',
    paddingTop: 15,
    maxWidth: 1050,
    margin: [[0, 'auto']],

    [breakpoints.down('sm')]: {
      fontSize: 14,
      lineHeight: '20px',
      paddingTop: 20,
    },
  },
  features: {
    display: 'flex',
    margin: [[-50, -16, 0]],

    [breakpoints.down('sm')]: {
      marginTop: -20,
      margin: [[-50, 'auto', 14]],
    },
  },

  feature: {
    background: '#FFF0CF',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
    padding: 30,
    margin: [[0, 16, 35]],
    flex: 1,
    fontSize: 18,
    lineHeight: '24px',

    [breakpoints.down('md')]: {
      fontSize: 14,
      lineHeight: '20px',
    },

    [breakpoints.down('sm')]: {
      margin: [[0, 0, 10]],
      padding: [[20, 14]],
    },
  },
  featureTitle: {
    marginBottom: 12,
    fontWeight: 700,
    color: '#333',
    fontSize: 24,
    lineHeight: '32px',

    [breakpoints.down('sm')]: {
      fontSize: 16,
      lineHeight: '21px',
    },
  },
  section: {
    padding: [[20, 0]],
  },
  sectionTitle: {
    fontSize: 24,
    lineHeight: '32px',
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 18,

    [breakpoints.down('sm')]: {
      fontSize: '20px',
      lineHeight: '32px',
      marginTop: 0,
    },
  },
  sectionDesc: {
    fontSize: 16,
    marginBottom: 30,
    lineHeight: '24px',
    textAlign: 'center',
    [breakpoints.down('sm')]: {
      fontSize: '14px',
      lineHeight: '20px',
      maxWidth: 200,
      margin: [[0, 'auto', 30]],
    },
  },
  sectionAccent: {
    backgroundColor: '#fff',
    padding: [[20, 0]],
  },

  sectionContainer: {
    display: 'flex',

    justifyContent: 'space-around',
    maxWidth: 1600,

    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },

  sectionContainerStretch: {
    alignItems: 'stretch',
  },

  bullet: {
    textAlign: 'center',
    marginBottom: 40,
    fontSize: 16,
    lineHeight: '24px',

    [breakpoints.down('sm')]: {
      marginBottom: 30,
    },
  },

  bulletTitle: {
    fontWeight: 700,
    marginBottom: 20,

    [breakpoints.down('sm')]: {
      marginTop: 20,
      marginBottom: 0,
    },
  },

  brands: {
    margin: [[0, -16]],
  },

  brand: {
    background: '#fff',
    borderRadius: 4,
    margin: [[0, 16]],
    textAlign: 'center',
    marginBottom: 15,
    padding: 20,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: 350,
    boxSizing: 'border-box',
    fontSize: 18,
    lineHeight: '29px',

    [breakpoints.down('md')]: {
      fontSize: 16,
      lineHeight: '22px',
    },

    [breakpoints.down('sm')]: {
      margin: [[0, 10, 10]],
      minHeight: 'unset',
      padding: [[20, 10]],
    },
  },
  brandAbm: {
    background: `#3B5DBE url(${abmBg}) center bottom no-repeat`,
    color: '#fff',

    [breakpoints.down('sm')]: {
      paddingTop: 30,
      background: `#3B5DBE url(${abmBgLarge}) center bottom no-repeat`,
      backgroundSize: 'cover',

      '& $logoContainer img': {
        width: 210,
        maxWidth: 'unset',
        marginBottom: 25,
        marginTop: 10,
      },
      '& $brandTitle': {
        fontSize: 18,
        lineHeight: '29px',
        maxWidth: 300,
        margin: [[0, 'auto']],
      },
    },
  },

  brandEh: {
    '& $brandBtn': {
      [breakpoints.down('sm')]: {
        maxWidth: 300,
      },
    },
  },

  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 85,

    [breakpoints.down('sm')]: {
      height: 50,

      '& img': {
        maxWidth: '135px',
        height: 'auto',
      },

      marginBottom: 15,
    },
  },

  brandTitle: {
    fontWeight: 700,
    marginTop: 20,

    [breakpoints.down('sm')]: {
      marginTop: 0,
    },
  },

  brandDesc: {
    marginBottom: 20,
    fontSize: 16,
    lineHeight: '26px',

    [breakpoints.down('md')]: {
      fontSize: 14,
      lineHeight: '20px',

      [breakpoints.down('xs')]: {
        fontSize: 16,
        lineHeight: '26px',
        maxWidth: 290,
        margin: [[0, 'auto', 15]],
      },
    },
  },

  brandBtn: {
    alignSelf: 'flex-end',
    maxWidth: 180,
    margin: [['auto', 'auto', 20]],

    [breakpoints.down('sm')]: {
      fontSize: '16px',
      lineHeight: '26px',
      margin: [['auto', 'auto', 10]],
    },
  },

  countriesTitles: {
    marginBottom: 50,

    [breakpoints.down('sm')]: {
      marginBottom: 20,
    },
  },

  country: {
    textAlign: 'center',
    fontSize: 16,
    lineHeight: '24px',
    marginBottom: 20,

    [breakpoints.down('sm')]: {
      marginBottom: 25,
    },
  },
  countryThumb: {
    border: '1px solid #E0E0E0',
    boxSizing: 'border-box',
    borderRadius: 4,
  },

  countryTitle: {
    fontWeight: 700,
    color: '#333',
    marginTop: 25,

    [breakpoints.down('sm')]: {
      marginTop: 10,
    },
  },
}));
