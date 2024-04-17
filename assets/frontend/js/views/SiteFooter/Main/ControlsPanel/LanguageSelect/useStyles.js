import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    color: '#FFF',
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 700,
    marginLeft: 16,
    flexShrink: 0,
  },
  label: {
    marginRight: 9,
  },
  select: {
    flexGrow: 1,
  },
}));
