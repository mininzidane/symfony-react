import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    ...mixins.font(14, 20),
    color: '#333',
  },
  title: {
    ...mixins.font(16, 20, 700),
  },
}));
