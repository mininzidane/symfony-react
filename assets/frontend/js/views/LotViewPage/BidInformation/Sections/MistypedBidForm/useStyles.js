import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  container: {
    backgroundColor: '#E6ECFD',
    borderRadius: '6px',
    margin: '0 14px 14px',
  },
  input: {
    paddingBottom: 14,
    width: '100%',
  },
  inputLabel: {
    paddingBottom: '6px',
    color: '#333',
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap-reverse',
    margin: -7,
  },
  btn: {
    flexGrow: '1',
    minWidth: 'fit-content',
    flexBasis: '0',
    margin: '7px',
  },
}));
