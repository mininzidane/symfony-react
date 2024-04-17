import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    height: '100px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingBottom: '16px',
    paddingLeft: '14px',
    paddingRight: '14px',
  },
  title: {
    color: '#333333',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '21px',
    textAlign: 'center',
  },
  time: {
    fontSize: '12px',
    lineHeight: '20px',
    color: '#828282',
  },
}));
