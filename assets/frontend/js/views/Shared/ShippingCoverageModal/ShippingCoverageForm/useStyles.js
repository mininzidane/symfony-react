import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  desc: {
    ...mixins.font(14, 20, 400),
    paddingBottom: 15,
  },
}));
