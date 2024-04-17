import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    backgroundColor: '#E8EEFD',
    borderRadius: 4,
    padding: '30px 14px !important',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    ...mixins.font(16, 20, 400),
    padding: [[10, 14, 15]],
    textAlign: 'center',
  },
  button: {
    minWidth: 180,
  },
}));
