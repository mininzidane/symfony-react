import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  bounceIn: {
    '& svg': {
      animation: 'bounceIn .2s ease-out forwards',
    },
  },
  bounceOut: {
    '& svg': {
      animation: 'bounceOut .2s ease-out forwards',
    },
  },
}));
