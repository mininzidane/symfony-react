import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [breakpoints.up('md')]: {
      position: 'relative',
      minHeight: 52,
    },
  },
}));
