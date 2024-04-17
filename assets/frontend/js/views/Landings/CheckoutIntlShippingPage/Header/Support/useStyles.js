import { makeStyles } from '@material-ui/core/styles';
import HeadphonesIconSvg from 'frontend/images/shared/various/headphones.svg';
import MessageIconSvg from './img/message.svg';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 auto',
  },
  phone: {
    ...mixins.font(14, 20, 400),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    color: '#fff!important',
    marginRight: 32,
    '&:before': {
      content: '""',
      backgroundImage: `url(${HeadphonesIconSvg})`,
      width: '12px',
      height: '16px',
      display: 'block',
      position: 'relative',
      backgroundSize: 'cover',
      marginRight: '8px',
      [breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    '&:hover': {
      textDecoration: 'none',
      '& strong': {
        textDecoration: 'underline',
      },
    },
    [breakpoints.down('sm')]: {
      marginRight: 0,
    },
  },
  contact: {
    ...mixins.font(14, 20, 400),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    whiteSpace: 'nowrap',
    textDecoration: 'none',
    color: '#fff!important',
    '&:before': {
      content: '""',
      backgroundImage: `url(${MessageIconSvg})`,
      width: '16px',
      height: '15px',
      display: 'block',
      position: 'relative',
      backgroundSize: 'cover',
      marginRight: '8px',
      marginBottom: '-2px',
    },
    '&:hover': {
      textDecoration: 'none',
      '& span': {
        textDecoration: 'underline',
      },
    },
  },
}));
