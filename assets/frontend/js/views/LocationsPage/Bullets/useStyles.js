import { makeStyles } from '@material-ui/core/styles';
import Bullet1SrcMobile from './img/mb-bullet-1.png';
import Bullet2SrcMobile from './img/mb-bullet-2.png';
import Bullet3SrcMobile from './img/mb-bullet-3.png';
import Bullet4SrcMobile from './img/mb-bullet-4.png';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[40, 0]],
  },
  bulletsContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gridTemplateRows: '1fr',
    gap: 40,

    [breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: '1fr',
      gap: 14,
    },
  },
  item: {
    background: '#FFFFFF',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
    borderRadius: 4,
    position: 'relative',
    backgroundRepeat: 'no-repeat',
    marginBottom: 0,
    backgroundSize: 'contain',
    backgroundPosition: [['center', -4]],
    paddingLeft: 0,

    [breakpoints.only('md')]: {
      backgroundRepeat: 'repeat-x',
      backgroundSize: 'auto',
    },
  },
  item1: {
    backgroundImage: `url(${Bullet1SrcMobile})`,
  },

  item2: {
    backgroundImage: `url(${Bullet2SrcMobile})`,
  },
  item3: {
    backgroundImage: `url(${Bullet3SrcMobile})`,
  },
  item4: {
    backgroundImage: `url(${Bullet4SrcMobile})`,
  },
  h2: {
    fontWeight: 400,
    fontSize: 24,
    lineHeight: 1.75,
    marginBottom: 25,
  },

  group: {
    padding: [[64, 20, 15, 20]],
    position: 'relative',
    zIndex: 1,

    [breakpoints.down('md')]: {
      paddingTop: 64,
      paddingBottom: 24,
    },
  },
  title: {
    fontWeight: '700',
    fontSize: '18px',
    lineHeight: '24px',
    fontStyle: 'normal',
    marginTop: 0,
    marginBottom: 10,

    [breakpoints.down('md')]: {
      marginBottom: 18,
    },
  },
  desc: {
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '21px',
  },
}));
