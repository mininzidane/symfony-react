import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  card: {
    borderRadius: '6px',
    backgroundColor: '#E6ECFD',
  },
  actions: {
    display: 'flex',
    flexWrap: 'wrap-reverse',
    margin: '-7px',
  },
  btn: {
    flexBasis: '0',
    flexGrow: '1',
    minWidth: 'fit-content',
    margin: '7px',
    position: 'relative',
  },
}));
