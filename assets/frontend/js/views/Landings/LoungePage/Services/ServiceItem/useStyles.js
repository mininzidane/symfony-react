import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '24px 1fr',
    gridGap: 18,
  },
  title: {
    ...mixins.font(16, 22, 700),
    margin: 0,
  },
  subtitle: {
    ...mixins.font(16, 22, 400),
    marginTop: 12,
  },
}));
