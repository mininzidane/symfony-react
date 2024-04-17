import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    ...mixins.font(16, 24, 400),
    padding: [[14, 25]],
    border: '1px solid #BDBDBD',
    borderRadius: 4,
  },
}));
