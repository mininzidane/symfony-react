import { makeStyles } from '@material-ui/core/styles';
import CallSvg from 'frontend/images/shared/support/call.svg';
import EmailSvg from 'frontend/images/shared/support/email.svg';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#FFF',
    borderRadius: 4,
    padding: [[0, 35, 32]],
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',

    [breakpoints.down('md')]: {
      boxShadow: 'none',
      padding: [[0, 0, 24]],
    },
  },
  desc: {
    paddingTop: 12,
    fontSize: '14px',
    lineHeight: '19px',
    color: '#000000',
    marginBottom: '24px',
  },
  wrap: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [breakpoints.down('md')]: {
      justifyContent: 'left',
    },
    [breakpoints.down('xs')]: {
      justifyContent: 'space-between',
    },
  },
  phoneNumberLink: {
    backgroundImage: `url(${CallSvg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '22px',
    minHeight: '22px',
    display: 'block',
    paddingLeft: '28px',
    fontSize: '18px',
    lineHeight: '24px',
    [breakpoints.down('xs')]: {
      fontSize: '16px',
    },
  },
  emailLink: {
    backgroundImage: `url(${EmailSvg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '22px',
    minHeight: '22px',
    display: 'block',
    paddingLeft: '28px',
    marginTop: '10px',
  },
  messengers: {
    display: 'flex',
    alignItems: 'center',
    '& a': {
      marginLeft: '14px',
      '& img': {
        display: 'block',
      },
    },
  },
  p: {
    marginBottom: 24,
  },
}));
