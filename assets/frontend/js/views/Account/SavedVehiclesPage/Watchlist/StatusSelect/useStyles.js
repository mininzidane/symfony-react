import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[5, 0]],
    marginRight: 22,
  },
  triggerLabel: {
    [breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));
