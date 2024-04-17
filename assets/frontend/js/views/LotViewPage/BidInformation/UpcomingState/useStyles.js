import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  container: {
    ...mixins.font(14, 20, 400),
    color: '#333',
  },
  action: {
    backgroundColor: '#E6ECFD',
    borderRadius: '6px',
    marginTop: 14,
  },
}));
