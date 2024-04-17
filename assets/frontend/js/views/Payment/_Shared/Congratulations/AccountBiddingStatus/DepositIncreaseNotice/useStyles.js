import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'no-wrap',
    padding: [[5, 0, 5, 20]],
  },
  message: {
    ...mixins.font(14, 20, 400),
    paddingRight: 2,
    color: '#6F130B',
  },
  icon: {
    position: 'relative',
    top: -4,
    left: -2,
  },
}));
