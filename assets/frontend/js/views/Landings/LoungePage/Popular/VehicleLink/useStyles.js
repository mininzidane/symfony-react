import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    display: 'grid',
    gridGap: 18,
    padding: '3px 0',
  },
  title: {
    ...mixins.font(16, 24, 700),
  },
  subtitle: {
    ...mixins.font(16, 24, 400),
    marginTop: 12,
  },
}));
