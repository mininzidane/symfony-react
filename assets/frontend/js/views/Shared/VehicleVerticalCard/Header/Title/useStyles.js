import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    ...mixins.textEllipsis(),
    ...mixins.font(20, 30, 700),
    minWidth: 0,
    color: '#2158F5',
  },
}));
