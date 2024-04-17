import { makeStyles } from '@material-ui/core/styles';
import HeroBackgroundJpg from './img/bg.jpg';
import HeroBackgroundMobileJpg from './img/bg-mobile.jpg';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    padding: [[76, 0]],
    backgroundColor: '#0A205F',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'auto 100%',
    backgroundImage: `url(${HeroBackgroundJpg})`,

    [breakpoints.down('lg')]: {
      padding: [[20, 24, 24]],
    },

    [breakpoints.down('md')]: {
      padding: [[14, 0]],
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
    padding: [[85, 45, 30]],
    background: 'rgba(0, 0, 0, 0.65)',
    backdropFilter: 'blur(24px)',
    borderRadius: '4px',

    [breakpoints.down('lg')]: {
      padding: [[14, 24]],
    },

    [breakpoints.down('sm')]: {
      padding: [[16, 14]],
    },
  },
  title: {
    ...mixins.font(36, 48, 700),
    color: '#FFFFFF',
    margin: 0,

    [breakpoints.down('md')]: {
      ...mixins.font(32, 44),
    },

    [breakpoints.down('sm')]: {
      ...mixins.font(24, 32),
    },
  },
  subtitle: {
    ...mixins.font(24, 32),
    color: '#FFFFFF',
    margin: [[18, 0, 0]],

    [breakpoints.down('sm')]: {
      ...mixins.font(16, 22),
      marginTop: 8,
    },
  },
}));
