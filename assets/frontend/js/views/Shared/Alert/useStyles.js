import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    backgroundColor: '#FFF1D2',
    boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.25)',
    padding: [[15, 0]],
    fontSize: 14,
    lineHeight: '22px',
  },
  attention: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 10,
    verticalAlign: 'sub',
  },
}));
