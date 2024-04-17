import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '9px 14px 14px 14px',
    backgroundColor: '#E6ECFD',
    ...mixins.font(14, 22, 400),
    color: '#333333',
    borderRadius: 6,
    marginTop: 14,
  },
  title: {
    textAlign: 'center',
    paddingBottom: 8,
  },
  vehicle: {
    textTransform: 'uppercase',
    display: 'inline-block',
  },
}));
