import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  bodyTitle: {
    ...mixins.font(18, 18, 400),
    marginBottom: '14px',
  },
}));
