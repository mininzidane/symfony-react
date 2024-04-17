import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 18,
    color: '#333333',
    lineHeight: '22px',
    fontWeight: 400,
    marginTop: 30,
    marginBottom: 15,
  },
  icon: {
    width: 16,
    height: 16,
    marginRight: 10,
    borderRadius: '50%',
  },
}));
