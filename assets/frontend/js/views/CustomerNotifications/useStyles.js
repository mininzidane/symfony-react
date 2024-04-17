import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  '@global': {
    'body.is-mobile-header-minimized .customer-notification': {
      [breakpoints.down('sm')]: {
        top: 66, // 60px (minimized header height) + 6px margin
      },
    },
  },
}));
