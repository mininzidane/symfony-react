import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  triggerWrap: {
    padding: [[5, 0]],
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
  },
  triggerDesc: {
    marginRight: 5,
  },
  paper: {
    padding: 0,
    width: '100vw',
    maxWidth: 350,
    [breakpoints.down('xs')]: {
      maxWidth: 'calc(100vw - 28px)',
    },
  },
}));
