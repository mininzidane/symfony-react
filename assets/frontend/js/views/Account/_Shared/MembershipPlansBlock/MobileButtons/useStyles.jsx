import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  btnMobile: {
    display: 'none',
    [breakpoints.down('md')]: {
      display: 'block',
    },
  },
  mobileButtons: {
    alignItems: 'center',
    padding: '20px 15px',
    whiteSpace: 'nowrap',
    display: 'flex',
    backgroundColor: 'rgb(241, 241, 248)',
  },
  btnMobileLeft: {
    marginRight: 20,
  },
}));
