import { makeStyles } from '@material-ui/core/styles';
import GlobePng from './img/globe.png';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    height: '590px',
    borderTop: '1px solid #E3EFF9',
    overflow: 'hidden',
    padding: 0,
    position: 'relative',
    [breakpoints.down('sm')]: {
      height: 'auto',
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '1383px',
      height: '545px',
      background: `url(${GlobePng})`,
      pointerEvents: 'none',
      [breakpoints.down('lg')]: {
        left: '-400px',
      },
      [breakpoints.down('sm')]: {
        left: '-300px',
        top: '25px',
        opacity: '.5',
      },
    },
  },
  wrap: {
    position: 'relative',
    zIndex: 10,
    width: 'calc(100% / 2.4)',
    marginLeft: 'auto',
    marginTop: '80px',
    [breakpoints.down('lg')]: {
      width: 'calc(100% / 2)',
    },
    [breakpoints.down('sm')]: {
      width: '100%',
      marginTop: '40px',
      marginBottom: '55px',
    },
  },
  title: {
    ...mixins.font(36, 48, 300),
    color: '#2158F5',
    margin: 0,
    maxWidth: 480,
    [breakpoints.down('sm')]: {
      ...mixins.font(26, 34),
      maxWidth: 'none',
    },
  },
  desc: {
    ...mixins.font(16, 21),
    marginTop: 20,
  },
}));
