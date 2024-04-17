import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  toolbarTitle: {
    [breakpoints.down('sm')]: {
      minHeight: 16,

      '& *': {
        display: 'none !important',
      },
    },
  },
}));
