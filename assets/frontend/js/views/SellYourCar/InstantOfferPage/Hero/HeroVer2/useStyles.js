import { makeStyles } from '@material-ui/core/styles';
import HeroBackgroundJpg from './img/bg.jpg';
import HeroBackgroundMobileJpg from './img/bg-mobile.jpg';
import HeroBackgroundTabletJpg from './img/bg-tablet.jpg';

export default makeStyles(({ breakpoints }) => ({
  '@global': {
    '#header-auth-buttons': {
      display: 'none',
    },
  },
  root: {
    padding: [[40, 0, 96]],
    backgroundSize: 'cover',
    backgroundColor: '#76807f',
    backgroundPosition: 'center',
    backgroundImage: `url(${HeroBackgroundJpg})`,
    maxHeight: 576,
    height: '40vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    [breakpoints.down('lg')]: {
      backgroundImage: `url(${HeroBackgroundTabletJpg})`,
      minHeight: 360,
      maxHeight: 550,
      height: '46vw',
      paddingBottom: 92,
    },
    [breakpoints.down(500)]: {
      backgroundImage: `url(${HeroBackgroundMobileJpg})`,
      backgroundPosition: 'center top',
      minHeight: 564,
      maxHeight: 564,
      height: 'auto',
      paddingBottom: '32px',
      alignItems: 'flex-end',
    },
  },
  wrap: {
    maxWidth: '616px',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    [breakpoints.down('lg')]: {
      maxWidth: '356px',
    },
    [breakpoints.down(500)]: {
      width: '320px',
    },
  },
  title: {
    margin: 0,
    fontWeight: '700',
    fontSize: '58px',
    lineHeight: '77px',
    color: '#FFFFFF',
    marginBottom: '24px',

    [breakpoints.down('lg')]: {
      fontSize: '36px',
      lineHeight: '48px',
      marginBottom: '28px',
    },
    [breakpoints.down(500)]: {
      fontSize: '32px',
      lineHeight: '43px',
    },
  },
  cta: {
    minWidth: 460,
    height: 80,
    background: 'linear-gradient(268.79deg, rgba(255, 255, 255, 0.5) 2.26%, rgba(255, 255, 255, 0) 97.11%), #FDB81E',
    backgroundBlendMode: 'overlay, normal',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
    borderRadius: '90px',
    fontWeight: '700',
    fontSize: '32px!important',
    lineHeight: '43px!important',
    textTransform: 'uppercase',
    [breakpoints.down('lg')]: {
      height: 60,
      fontSize: '24px!important',
      lineHeight: '32px!important',
      minWidth: 345,
    },
    [breakpoints.down(500)]: {
      minWidth: '322px',
    },
  },
  modal: {
    backgroundColor: '#fff',
    padding: '0',
    borderRadius: '4px',
  },
  closeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
}));
