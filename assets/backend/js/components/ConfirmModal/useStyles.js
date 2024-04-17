import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  modalBody: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: 46,
  },
  actions: {
    display: 'flex',
    paddingTop: '16px',
    paddingBottom: '28px',
    justifyContent: 'center',
  },
  title: {
    ...mixins.font(24, 28, 700),
    color: '#686A6C',
    marginTop: '20px',
    marginBottom: '8px',
  },
  subtitle: {
    ...mixins.font(18, 24, 400),
    color: '#999999',
    marginTop: '10px',
  },
  btn: {
    margin: '0 6px',
  },
}));
