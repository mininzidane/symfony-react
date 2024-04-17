import { makeStyles } from '@material-ui/core/styles';
import LegoPng from './img/lego.png';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    padding: '65px 0 100px',
    position: 'relative',
    overflow: 'hidden',
    [breakpoints.down('lg')]: {
      overflow: 'visible',
    },
    [breakpoints.down('sm')]: {
      padding: '40px 0 55px',
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      top: '115px',
      right: 'calc(50% - 650px)',
      width: '547px',
      height: '367px',
      background: `url(${LegoPng})`,
      pointerEvents: 'none',
      [breakpoints.down('lg')]: {
        right: 0,
        width: 447,
        top: '-50px',
      },
      [breakpoints.down('md')]: {
        width: 197,
      },
      [breakpoints.down('sm')]: {
        width: 147,
        opacity: '0.15',
        top: '-30px',
      },
    },
  },
  container: {
    position: 'relative',
  },
  title: {
    ...mixins.font(36, 48, 300),
    color: '#2158F5',
    margin: '0 0 50px',
    maxWidth: 480,
    [breakpoints.down('sm')]: {
      ...mixins.font(26, 34),
      maxWidth: 'none',
      marginBottom: 30,
    },
  },
  advantage: {
    ...mixins.font(16, 21),
    marginTop: 20,
    maxWidth: 550,
    '& h2': {
      ...mixins.font(16, 21, 700),
      display: 'inline',
    },
    [breakpoints.down('sm')]: {
      maxWidth: 'none',
    },
  },
}));
