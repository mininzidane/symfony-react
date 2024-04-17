import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#FFF',
    padding: [[20, 0]],
    backgroundPosition: 'top right',
    backgroundRepeat: 'no-repeat',

    [breakpoints.down('lg')]: {
      backgroundSize: '660px auto',
    },

    [breakpoints.down('md')]: {
      background: '#FFF !important',
    },
  },
  buttonWrap: {
    padding: [[60, 0]],
    display: 'flex',

    [breakpoints.down('sm')]: {
      padding: [[25, 0, 35]],
      justifyContent: 'center',
    },
  },
  innerWrap: {
    width: 'calc(100%/1.5)',

    [breakpoints.down('md')]: {
      width: '100%',
    },
  },
}));
