import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    width: '100%',
  },
  title: {
    marginBottom: 6,
    fontWeight: 700,
    fontSize: '14px',
    lineHeight: '19px',
  },
  checkList: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    padding: [[18, 25, 20]],
    boxShadow: '0 2px 3px rgb(0 0 0 / 20%)',
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    backgroundColor: '#FFF',
  },
  green: {
    backgroundColor: 'green',
  },
  red: {
    backgroundColor: 'red',
  },
}));
