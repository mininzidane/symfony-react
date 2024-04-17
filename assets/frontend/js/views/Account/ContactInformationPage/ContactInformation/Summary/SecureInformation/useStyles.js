import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    marginTop: 15,
    ...mixins.font(12, 16),
    color: '#000000',
    textAlign: 'center',
  },
  title: {
    ...mixins.font(14, 19),
    color: '#333333',
    marginBottom: '4px',
  },
}));
