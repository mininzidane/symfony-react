import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  cta: {
    minWidth: 130,

    [breakpoints.down('sm')]: {
      width: '100% !important',
    },
  },
}));
