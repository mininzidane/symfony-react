import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    backgroundColor: '#fff',
  },
  title: {
    ...mixins.font(28, 39, 300),
    textAlign: 'center',
    color: '#333333',
    marginBottom: 2,
    marginTop: -2,
  },
  description: {
    ...mixins.font(14, 20),
    textAlign: 'center',
    color: '#333333',
    marginBottom: 14,
  },
  cta: {
    marginTop: 10,
  },
  close: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 12,
  },
}));
