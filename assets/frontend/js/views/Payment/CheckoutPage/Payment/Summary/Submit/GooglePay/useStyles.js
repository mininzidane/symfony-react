import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    width: '100%',

    '& button': {
      width: '100% !important',
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2) !important',
    },
  },
}));
