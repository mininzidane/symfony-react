import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    marginBottom: 20,
    ...mixins.font(12, 16),
    color: '#000000',
  },
  title: {
    ...mixins.font(14, 19, 700),
    color: '#333333',
    marginBottom: 10,
  },
}));
