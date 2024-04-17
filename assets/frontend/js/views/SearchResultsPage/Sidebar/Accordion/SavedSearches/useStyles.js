import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  content: {
    ...mixins.font(15, 20),
  },
}));
