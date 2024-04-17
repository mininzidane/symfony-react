import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    padding: [[40, 0, 50]],
    textAlign: 'center',
  },
  title: {
    ...mixins.font(28, 30, 400),
    color: '#4F4F4F',
    margin: [[28, 0, 0]],
  },
  subtitle: {
    ...mixins.font(16, 24, 400),
    color: '#333333',
    margin: [[10, 0, 0]],
  },
  button: {
    marginTop: 25,
  },
}));
