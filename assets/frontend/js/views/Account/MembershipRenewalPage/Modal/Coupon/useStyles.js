import { makeStyles } from '@material-ui/core/styles';
import ConfettiSvg from './img/confetti.svg';
import ConfettiMobileSvg from './img/confetti-mobile.svg';

export default makeStyles(({ mixins, breakpoints }) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `#FFFFFF url(${ConfettiSvg}) no-repeat top center`,
    backgroundSize: 'cover',
    padding: 0,

    [breakpoints.down('sm')]: {
      background: `#FFFFFF url(${ConfettiMobileSvg})`,
      backgroundSize: 'cover',
    },
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: '#333333',

    [breakpoints.down('sm')]: {
      margin: [[34, 10, 20]],
    },
  },
  offer: {
    textTransform: 'uppercase',
    marginBottom: 15,
    ...mixins.font(14, 16, 700),

    [breakpoints.down('sm')]: {
      marginBottom: 0,
    },
  },
  keep: {
    textTransform: 'uppercase',
    marginBottom: 5,
    ...mixins.font(48, 48, 700),

    [breakpoints.down('sm')]: {
      marginBottom: 0,
      ...mixins.font(24, 38, 700),
    },
  },
  discount: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
    textTransform: 'uppercase',
    ...mixins.font(48, 48, 700),

    [breakpoints.down('sm')]: {
      flexDirection: 'column',
      textAlign: 'center',
      ...mixins.font(24, 30, 700),
    },
  },
  discountOriginal: {
    color: '#EE8989',
    textDecoration: 'line-through',
  },
  discountDescription: {
    textAlign: 'center',
    ...mixins.font(19, 30, 400),
    marginBottom: 15,

    [breakpoints.down('sm')]: {
      ...mixins.font(14, 22, 400),
    },
  },
  ctaDiscount: {
    maxWidth: '320px',
    marginBottom: 10,
  },
  ctaCancel: {
    ...mixins.font(16, 25, 400),

    [breakpoints.down('sm')]: {
      ...mixins.font(14, 22, 400),
    },
  },
}));
