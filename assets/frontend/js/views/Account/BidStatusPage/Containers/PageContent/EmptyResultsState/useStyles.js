import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    padding: [[40, 10, 0]],
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    minHeight: 400,
  },
  title: {
    ...mixins.font(28, 34, 400),
    color: '#4F4F4F',
    margin: [[15, 0, 0]],
    textAlign: 'center',
  },
  descriptions: {
    ...mixins.font(16, 20, 400),
    margin: [[14, 0, 0]],
    color: '#333',
    textAlign: 'center',
  },
}));
