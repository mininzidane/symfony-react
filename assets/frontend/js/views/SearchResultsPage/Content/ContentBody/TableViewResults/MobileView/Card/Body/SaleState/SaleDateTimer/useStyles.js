import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    ...mixins.font(12, 18, 600),
    color: '#6F130B',
  },
}));
