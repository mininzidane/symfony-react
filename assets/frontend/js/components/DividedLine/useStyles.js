import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    lineHeight: '24px',
    fontSize: 14,

    '& > div': {
      display: 'inline-flex',
      verticalAlign: 'middle',
    },
  },
  divider: {
    display: 'inline !important',
    background: 'linear-gradient(90deg, transparent, #353535, transparent)',
    backgroundPosition: '50%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '1px auto',

    fontSize: 9,
    letterSpacing: 20,
  },
}));
