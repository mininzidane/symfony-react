import { makeStyles } from '@material-ui/core/styles';
import coupon from './img/coupon-bg.png';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[42, 0, 48]],
  },
  content: {
    display: 'flex',
  },
  hide: {
    display: 'none !important',
  },
  left: {
    maxWidth: 570,
    paddingRight: 60,

    [breakpoints.down('md')]: {
      paddingRight: 30,
    },
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexGrow: 1,
    maxWidth: '50%',

    [breakpoints.down('sm')]: {
      justifyContent: 'center',
      alignItems: 'center',
      maxWidth: 'none',
    },
  },
  coupon: {
    background: `url("${coupon}") center/contain no-repeat`,
    marginBottom: 6,
    height: 140,
    width: 360,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    fontSize: '18px',
    color: '#B23D00',
    paddingLeft: 144,

    [breakpoints.down('sm')]: {
      marginBottom: 10,
    },
  },
  couponCode: {
    width: 200,
    fontSize: '20px',
    textTransform: 'uppercase',
    padding: 6,
    fontWeight: 700,
    border: '1px dotted #B23D00',
    margin: [[6, 0]],
    textAlign: 'center',
    borderRadius: 3,
    userSelect: 'all',
  },
  couponSubtitle: {
    textTransform: 'capitalize',
  },
  couponDesc: {
    maxWidth: 240,
    margin: [[0, 0, 21]],
    fontSize: '12px',
    lineHeight: 1.3,
    color: '#fff',
    textAlign: 'left',
  },
  features: {
    marginBottom: 30,
    padding: [[0, 20]],
    color: '#fff',
  },
  feature: {
    fontSize: '26px',
    lineHeight: 1.6,
    fontWeight: 700,
    marginBottom: 4,
    listStyleType: 'disc',

    [breakpoints.down('md')]: {
      fontSize: '24px',
      lineHeight: '33px',
    },

    [breakpoints.down('sm')]: {
      fontSize: '18px',
      lineHeight: '30px',
    },
  },
}));
