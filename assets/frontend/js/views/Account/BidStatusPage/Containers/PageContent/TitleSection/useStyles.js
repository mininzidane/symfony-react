import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: [[18, 0]],

    [breakpoints.down('sm')]: {
      padding: [[15, 14]],
    },
  },
}));
