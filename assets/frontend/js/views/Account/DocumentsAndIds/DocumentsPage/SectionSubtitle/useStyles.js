import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    ...mixins.font(14, 20, 300),
    margin: [[12, 0, 0]],
    color: '#333',
  },
}));
