import { makeStyles } from '@material-ui/core/styles';
import ukraineFlagSVG from './img/ukraine-flag.svg';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: '110px 0 120px',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#3B3A17',
    color: '#fff',
    fontSize: '20px',
    lineHeight: '30px',
    position: 'relative',
    maxWidth: '100%',
    '& h1': {
      margin: '0',
      color: '#FFF',
      fontSize: '33px',
      lineHeight: '42px',
      fontWeight: '700',
      [breakpoints.down('sm')]: {
        fontSize: '22px',
        lineHeight: '28px',
        maxWidth: '250px',
        margin: '0 auto',
      },
    },
    '& h2': {
      margin: '20px 0 0',
      color: '#FFF',
      fontSize: '20px',
      lineHeight: '30px',
      fontWeight: '400',
      [breakpoints.down('sm')]: {
        margin: '10px 0 0',
        fontSize: '16px',
        lineHeight: '20px',
      },
    },
    '& a': {
      color: '#fff',
      textDecoration: 'underline',
    },
  },
  container: {
    position: 'relative',
    zIndex: '2',
    maxWidth: '480px',
    [breakpoints.down('sm')]: {
      textAlign: 'center',
    },
    [breakpoints.up('md')]: {
      margin: 0,
      paddingLeft: '30px',
    },
    [breakpoints.up('xl')]: {
      paddingLeft: '98px',
      maxWidth: '560px',
    },
  },
  ukraineFlag: {
    backgroundImage: `url(${ukraineFlagSVG})`,
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: '0',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',
    zIndex: '1',
    right: '26%',
    [breakpoints.down('sm')]: {
      right: '0',
      backgroundPosition: '-220px',
    },
  },
}));
