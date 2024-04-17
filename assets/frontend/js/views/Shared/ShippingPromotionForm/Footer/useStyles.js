import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    background: '#E4E2E0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  total: {
    ...mixins.font(16, 21),
    marginTop: -5,
    marginBottom: 11,
  },
  buttonLink: {
    ...mixins.font(14, 21),
    marginTop: 9,
    marginBottom: -1,
    cursor: 'pointer',
  },
  loader: {
    marginTop: 15,
  },
}));
