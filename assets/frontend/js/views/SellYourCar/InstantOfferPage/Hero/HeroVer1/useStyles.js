import { makeStyles } from '@material-ui/core/styles';
import CheckmarkYellowSvg from 'frontend/images/shared/various/checkmark-yellow.svg';
import HeroBackgroundJpg from './img/bg.jpg';
import HeroBackgroundMobileJpg from './img/bg-mobile.jpg';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[76, 0, 76]],
    backgroundSize: 'cover',
    backgroundColor: '#97CFBB',
    backgroundPosition: 'center',
    backgroundImage: `url(${HeroBackgroundJpg})`,

    [breakpoints.down('lg')]: {
      padding: [[20, 24, 24]],
    },
    [breakpoints.down('md')]: {
      padding: [[14, 0, 14]],
    },
    [breakpoints.down('sm')]: {
      backgroundImage: `url(${HeroBackgroundMobileJpg})`,
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'auto 508px',
    gridGap: 20,

    [breakpoints.down('lg')]: {
      gridTemplateColumns: 'auto 440px',
    },

    [breakpoints.down('md')]: {
      gridTemplateColumns: 'auto 360px',
      gridGap: 16,
    },

    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      gridGap: 14,
    },
  },
  description: {
    padding: '30px 46px 42px',

    background: 'rgba(0, 0, 0, 0.65)',
    backdropFilter: 'blur(24px)',
    borderRadius: '4px',
    [breakpoints.down('lg')]: {
      padding: '17px 24px 42px',
    },
    [breakpoints.down('md')]: {
      padding: '14px 24px 24px',
    },
    [breakpoints.down('sm')]: {
      padding: '14px 14px 17px',
      borderRadius: '10px',
    },
  },
  title: {
    margin: 0,
    fontWeight: '600',
    fontSize: '39px',
    lineHeight: '52px',
    color: '#FFFFFF',

    [breakpoints.down('lg')]: {
      '& br': {
        display: 'none',
      },
    },

    [breakpoints.down('md')]: {
      fontWeight: '600',
      fontSize: '32px',
      lineHeight: '43px',
    },

    [breakpoints.down('sm')]: {
      fontSize: '20px',
      lineHeight: '29px',
      fontWeight: '400',
      '& br': {
        display: 'inline',
      },
    },
  },
  subtitle: {
    color: '#FFFFFF',
    fontWeight: '300',
    fontSize: '24px',
    lineHeight: '32px',
    marginTop: 4,
    marginBottom: 30,

    [breakpoints.down('md')]: {
      fontSize: '20px',
      lineHeight: '27px',
    },

    [breakpoints.down('sm')]: {
      fontWeight: '300',
      fontSize: '16px',
      lineHeight: '21px',
      marginBottom: 16,
    },
  },
  list: {
    color: '#FFFFFF',
    fontWeight: '350',
    fontSize: '20px',
    lineHeight: '24px',
    margin: 0,
    padding: 0,
    listStyle: 'none',

    [breakpoints.down('xs')]: {
      columnCount: 2,
    },

    '& li': {
      marginBottom: 17,
      display: 'flex',
      alignItems: 'center',
      '&:last-child': {
        marginBottom: 0,
      },
      '&:before': {
        content: '""',
        display: 'block',
        backgroundImage: `url(${CheckmarkYellowSvg})`,
        backgroundSize: 'cover',
        width: 16,
        height: 16,
        marginRight: 10,
        [breakpoints.down('sm')]: {
          width: 14,
          height: 14,
        },
      },
      [breakpoints.down('sm')]: {
        marginBottom: 12,
      },
    },
    [breakpoints.down('sm')]: {
      fontSize: '16px',
      lineHeight: '24px',
    },
  },
}));
