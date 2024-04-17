import { makeStyles } from '@material-ui/core/styles';
import MapPng from './img/map.png';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    padding: '65px 0 100px',
    borderTop: '1px solid white',
    borderBottom: '1px solid white',
    position: 'relative',
    [breakpoints.down('md')]: {
      overflow: 'hidden',
    },
    [breakpoints.down('sm')]: {
      padding: '40px 0 55px',
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      top: '-70px',
      left: '-240px',
      width: '1029px',
      height: '944px',
      background: `url(${MapPng})`,
      pointerEvents: 'none',

      [breakpoints.down('lg')]: {
        left: '-500px',
      },
      [breakpoints.down('md')]: {
        left: '-200px',
        top: '-170px',
        opacity: '0.15',
      },
    },
  },
  wrap: {
    position: 'relative',
    marginLeft: '50%',
    paddingLeft: 15,
    [breakpoints.down('md')]: {
      marginLeft: 0,
      paddingLeft: 0,
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
  disclaimer: {
    ...mixins.font(14, 19),
    color: '#444',
    marginTop: 30,
    marginBottom: 0,
  },
  steps: {
    marginTop: 35,
    [breakpoints.down('sm')]: {
      marginTop: 30,
    },
  },
}));
