import { makeStyles } from '@material-ui/core/styles';
import HeroShieldSvg from './img/hero-shield.svg';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    backgroundSize: 'cover',
    padding: '32px 0 45px',
    [breakpoints.down('md')]: {
      padding: '30px 0 40px',
    },
  },
  logo: {
    width: 152,
    [breakpoints.down('md')]: {
      width: 104,
    },
  },
  title: {
    ...mixins.font(48, 57, 300),
    color: '#fff',
    margin: '12px 0 0',

    [breakpoints.down('md')]: {
      ...mixins.font(27, 32),
      margin: '5px 0 30px',
    },
  },
  subtitle: {
    ...mixins.font(24, 32, 400),
    color: '#fff',
    margin: '20px 0 22px',
    [breakpoints.down('md')]: {
      ...mixins.font(20, 24),
      marginBottom: '20px',
    },
  },
  advantages: {
    ...mixins.font(16, 21),
    color: '#fff',
    listStyle: 'none',
    padding: 0,
    margin: 0,
    '& li': {
      marginTop: 20,
      '&:first-child': {
        marginTop: 0,
      },
      '&:before': {
        content: '""',
        backgroundSize: 'contain',
        background: `url(${HeroShieldSvg})`,
        width: 14,
        height: 15,
        display: 'inline-block',
        marginBottom: '-1px',
        marginRight: 11,
      },
    },
  },
}));
