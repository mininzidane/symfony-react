import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    ...mixins.textEllipsis(),
    ...mixins.font(28, 30, 700),
    color: '#333',
  },
}));
