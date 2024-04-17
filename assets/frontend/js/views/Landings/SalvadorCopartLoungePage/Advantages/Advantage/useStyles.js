import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    padding: [[30, 0, 0]],
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '340px',
    margin: '0 auto',
  },
  icon: {
    marginBottom: '28px',
    height: '42px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  advantage: {
    ...mixins.font(16, 24, 400),
    padding: '0 15px',
  },
}));
