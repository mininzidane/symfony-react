import { makeStyles } from '@material-ui/core/styles';
import OneDesktopSvg from './img/desktop/one.svg';
import TwoDesktopSvg from './img/desktop/two.svg';
import ThreeDesktopSvg from './img/desktop/three.svg';
import OneTabletSvg from './img/tablet/one.svg';
import TwoTabletSvg from './img/tablet/two.svg';
import ThreeTabletSvg from './img/tablet/three.svg';
import OneMobileSvg from './img/mobile/one.svg';
import TwoMobileSvg from './img/mobile/two.svg';
import ThreeMobileSvg from './img/mobile/three.svg';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#F1F1F8',
  },
  title: {
    fontSize: '32px',
    lineHeight: '47px',
    color: '#333333',
    marginBottom: 32,
    [breakpoints.down('md')]: {
      marginLeft: -200,
      textAlign: 'center',
    },
    [breakpoints.down('sm')]: {
      marginLeft: 0,
      marginBottom: 30,
      fontSize: '24px',
      lineHeight: '32px',
      '& strong': {
        display: 'inline-block',
      },
    },
  },
  container: {
    display: 'flex',
    alignItems: 'end',
    [breakpoints.down('sm')]: {
      flexWrap: 'wrap-reverse',
    },
  },
  people: {
    width: 570,
    height: 472,
    display: 'block',
    marginLeft: -68,
    marginRight: -18,
    marginBottom: -2,
    [breakpoints.down('lg')]: {
      marginRight: -58,
      marginLeft: 0,
      width: 390,
      height: 394,
    },
    [breakpoints.down('md')]: {
      marginRight: -68,
      marginLeft: -90,
    },
    [breakpoints.down('sm')]: {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: 343,
      height: 297,
    },
    [breakpoints.down('xs')]: {
      width: 289,
      height: 250,
    },
  },
  steps: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 508,
    paddingTop: 74,
    marginRight: -50,
    [breakpoints.down(1440)]: {
      marginRight: 0,
      marginLeft: -10,
    },
    [breakpoints.down('lg')]: {
      minHeight: 470,
      paddingTop: 36,
    },
    [breakpoints.down('md')]: {
      paddingTop: 30,
    },
    [breakpoints.down('sm')]: {
      width: '100%',
      minHeight: 'auto',
      marginLeft: '0',
      marginRight: '0',
      paddingTop: 30,
      paddingLeft: 8,
    },
  },
  step: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0 26px',
    marginBottom: 30,
    fontSize: '16px',
    lineHeight: '21px',
    color: '#333333',
    '&:before': {
      content: '""',
      display: 'block',
      width: 124,
      height: 72,
      marginTop: 4,
      backgroundRepeat: 'no-repeat',
      flexShrink: 0,
      [breakpoints.down(1440)]: {
        width: 64,
      },
    },
    [breakpoints.down('lg')]: {
      gap: '0 18px',
    },
    [breakpoints.down('sm')]: {
      fontSize: '14px',
      lineHeight: '19px',
      gap: '0 12px',
      marginBottom: 25,
    },
  },
  step1: {
    [breakpoints.up('md')]: {
      paddingLeft: 4,
    },
    '&:before': {
      backgroundImage: `url(${OneDesktopSvg})`,
      [breakpoints.down(1440)]: {
        backgroundImage: `url(${OneTabletSvg})`,
      },
      [breakpoints.down('sm')]: {
        backgroundImage: `url(${OneMobileSvg})`,
      },
    },
  },
  step2: {
    [breakpoints.up('md')]: {
      paddingLeft: 57,
    },
    '&:before': {
      backgroundImage: `url(${TwoDesktopSvg})`,
      [breakpoints.down(1440)]: {
        backgroundImage: `url(${TwoTabletSvg})`,
      },
      [breakpoints.down('sm')]: {
        backgroundImage: `url(${TwoMobileSvg})`,
      },
    },
  },
  step3: {
    [breakpoints.up('md')]: {
      paddingLeft: 108,
    },
    '&:before': {
      backgroundImage: `url(${ThreeDesktopSvg})`,
      [breakpoints.down(1440)]: {
        backgroundImage: `url(${ThreeTabletSvg})`,
      },
      [breakpoints.down('sm')]: {
        backgroundImage: `url(${ThreeMobileSvg})`,
      },
    },
  },
  titleStep: {
    fontSize: '24px',
    lineHeight: '29px',
    fontWeight: 700,
    color: '#333333',
    marginBottom: 10,
    [breakpoints.down('sm')]: {
      fontSize: '14px',
      lineHeight: '19px',
      marginBottom: 0,
    },
  },
}));
