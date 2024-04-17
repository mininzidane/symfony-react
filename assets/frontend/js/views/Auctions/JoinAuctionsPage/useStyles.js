import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  '@global': {
    'iframe#launcher': {
      [breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  },
}));
