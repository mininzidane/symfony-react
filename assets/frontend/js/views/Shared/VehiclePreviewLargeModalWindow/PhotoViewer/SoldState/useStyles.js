import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  blurred: {
    '& img': {
      filter: 'blur(5px)',
    },
  },
  icon: {
    width: 82,
    height: 78,

    [breakpoints.down('lg')]: {
      width: 56,
      height: 53,
    },
  },
  text: {
    color: 'white',
    margin: 'auto',
    width: '70%',
    fontWeight: 700,
    fontSize: 24,
    lineHeight: '30px',

    [breakpoints.down('lg')]: {
      fontSize: 18,
      lineHeight: '24px',
    },
  },
}));
