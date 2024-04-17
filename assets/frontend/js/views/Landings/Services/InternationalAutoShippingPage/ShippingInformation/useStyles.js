import { makeStyles } from '@material-ui/core/styles';
import SmartphoneInternationalPng from './img/smartphone-international@2x.png';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    padding: '80px 0 35px',
    position: 'relative',
    overflow: 'hidden',
    [breakpoints.down('md')]: {
      paddingTop: 50,
    },
    [breakpoints.down('sm')]: {
      padding: '40px 0 55px',
    },
    '&:before': {
      [breakpoints.up('lg')]: {
        content: '""',
        backgroundSize: '620px',
        background: `url(${SmartphoneInternationalPng})`,
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        right: '50%',
        marginRight: '-680px',
        width: '660px',
        height: '500px',
        pointerEvents: 'none',
        bottom: 0,
      },
      [breakpoints.up('xl')]: {
        marginRight: '-630px',
      },
    },
  },
  wrap: {
    position: 'relative',
    maxWidth: 490,
    [breakpoints.down('md')]: {
      width: '100%',
      maxWidth: 'none',
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
    color: '#000',
    marginTop: 24,
    marginBottom: 20,
    [breakpoints.down('sm')]: {},
  },
  contact: {
    marginTop: '28px',
  },
}));
