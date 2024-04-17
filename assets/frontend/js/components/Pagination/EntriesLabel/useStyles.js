import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    ...mixins.font(14, 16, 400),
    color: '#333',
  },
}));
