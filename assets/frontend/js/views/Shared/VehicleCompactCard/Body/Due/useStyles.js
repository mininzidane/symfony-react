import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    ...mixins.font(12, 18, 700),
  },
  label: {
    display: 'inline',
    fontWeight: 700,
  },
}));
