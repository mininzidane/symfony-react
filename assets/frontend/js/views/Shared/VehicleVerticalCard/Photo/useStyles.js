import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    width: '100%',
    display: 'block',
    borderRadius: [[4, 4, 0, 0]],
    overflow: 'hidden',

    [breakpoints.down('xs')]: {
      borderRadius: 0,
    },
  },
}));
