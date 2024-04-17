import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    padding: '12px 12px 15px',
    marginTop: '17px',
    fontSize: '12px',
    lineHeight: '17px',
    backgroundColor: '#FFF1D2',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
    '& button': {
      minWidth: '50%',
    },
  },
}));
