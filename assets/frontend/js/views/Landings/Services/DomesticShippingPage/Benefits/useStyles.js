import { makeStyles } from '@material-ui/core/styles';
import DomesticShippingRoadsPng from './img/domestic-shipping-roads.png';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    padding: '65px 0 100px',
    overflow: 'hidden',
    position: 'relative',
    maxWidth: 'none',
    [breakpoints.down('sm')]: {
      padding: '40px 0 55px',
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      top: '0',
      right: '0',
      width: '682px',
      height: '593px',
      background: `url(${DomesticShippingRoadsPng})`,
      pointerEvents: 'none',

      [breakpoints.down('lg')]: {
        right: '-200px',
      },
      [breakpoints.down('md')]: {
        right: '-400px',
      },
      [breakpoints.down('sm')]: {
        right: '-320px',
        opacity: '0.15',
      },
    },
  },
  title: {
    ...mixins.font(36, 48, 300),
    color: '#2158F5',
    margin: 0,
    [breakpoints.down('sm')]: {
      ...mixins.font(26, 36),
    },
  },
  subtitle: {
    ...mixins.font(24, 32, 300),
    color: '#2158F5',
    marginTop: 8,
    [breakpoints.down('sm')]: {
      ...mixins.font(18, 22),
    },
  },
  benefits: {
    position: 'relative',
    zIndex: '1',
    maxWidth: 550,
    marginTop: 50,
    [breakpoints.down('sm')]: {
      marginTop: 30,
    },
  },
}));
