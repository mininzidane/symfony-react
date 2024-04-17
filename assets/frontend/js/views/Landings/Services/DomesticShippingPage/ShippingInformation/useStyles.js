import { makeStyles } from '@material-ui/core/styles';
import SmartphoneDomesticPng from './img/smartphone-domestic@2x.png';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    padding: '70px 0 52px',
    borderTop: '1px solid white',
    borderBottom: '1px solid white',
    position: 'relative',
    overflow: 'hidden',
    [breakpoints.down('md')]: {
      paddingTop: 50,
    },
    [breakpoints.down('sm')]: {
      padding: '40px 0 55px',
    },
    '&:before': {
      [breakpoints.up('md')]: {
        content: '""',
        backgroundSize: 'contain',
        background: `url(${SmartphoneDomesticPng})`,
        position: 'absolute',
        right: '50%',
        top: '40px',
        marginRight: '-625px',
        width: '645px',
        height: '676px',
        pointerEvents: 'none',
      },
      [breakpoints.up('lg')]: {
        top: '40px',
        marginRight: '-635px',
      },
    },
  },
  wrap: {
    position: 'relative',
    width: 'calc(100% / 2.4)',
    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  title: {
    ...mixins.font(36, 48, 300),
    color: '#2158F5',
    margin: 0,
    [breakpoints.down('sm')]: {
      ...mixins.font(26, 34),
    },
  },
  desc: {
    ...mixins.font(16, 21),
    color: '#444',
    marginTop: 24,
    marginBottom: 20,
    [breakpoints.down('sm')]: {},
  },
  contact: {
    marginTop: '28px',
  },
}));
