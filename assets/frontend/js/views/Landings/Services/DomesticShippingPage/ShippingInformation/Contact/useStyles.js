import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    background: '#E9E3C3',
    padding: '20px 25px',
    borderRadius: '4px',
    ...mixins.font(16, 21),
  },
  icon: {
    width: '20px',
    height: '16px',
    marginRight: '13px',
  },
  email: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  phone: {
    display: 'flex',
    alignItems: 'center',
  },
}));
