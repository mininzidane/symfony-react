import { makeStyles } from '@material-ui/core/styles';
import TransporterImage from './img/transporter.jpg';
import ShipImage from './img/ship.jpg';

export default makeStyles(({ isWideView }) => ({
  root: {
    position: 'relative',
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  wrap: {
    maxWidth: isWideView ? '50%' : '100%',
  },
  content: {
    backgroundSize: 'cover',
    backgroundPosition: 'bottom',
    backgroundRepeat: 'no-repeat',
    backgroundImage: `linear-gradient(90.12deg, #FFFFFF 50%, rgba(255, 255, 255, 0.06) 100%), url(${ShipImage})`,
    borderRadius: '0 0 4px 4px',
  },
  domestic: {
    backgroundImage: `url(${TransporterImage})`,
    backgroundPosition: isWideView ? 'center' : 'top right',
    backgroundSize: isWideView ? 'cover' : 'auto calc(100% - 78px)',

    '&.is-custom-quote': {
      backgroundSize: isWideView ? 'cover' : 'auto 116px',
    },
  },
  shippingTo: {
    display: 'flex',
    alignItems: 'baseline',
    lineHeight: '22px',
    whiteSpace: 'nowrap',

    '& > div:last-child': {
      fontWeight: 'bold',
      marginLeft: 5,
    },

    justifyContent: isWideView ? 'space-between' : 'flex-start',
  },
  trigger: {
    fontWeight: 700,
  },
}));
