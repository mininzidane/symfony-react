import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    paddingBottom: '14px',
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  description: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    width: '100%',
    color: '#333333',
    fontSize: '14px',
    marginTop: -3,
    paddingBottom: '14px',
  },
  price: {
    fontSize: '20px',
    fontWeight: 300,
    '& strong': {
      fontWeight: 700,
    },
  },
  actions: {
    color: '#333333',
    display: 'flex',
    padding: '7px',
    borderRadius: '6px',
    backgroundColor: '#E6ECFD',
    flexWrap: 'wrap-reverse',
  },
  btn: {
    flexGrow: '1',
    minWidth: 'fit-content',
    flexBasis: '0',
    margin: '7px',
    paddingLeft: '10px !important',
    paddingRight: '10px !important',
  },
}));
