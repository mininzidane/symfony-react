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
  price: {
    fontSize: '20px',
    fontWeight: 300,
    '& strong': {
      fontWeight: 700,
    },
  },
  card: {
    color: '#333333',
    display: 'grid',
    padding: 14,
    borderRadius: '6px',
    backgroundColor: '#E6ECFD',
    alignItems: 'center',
    gridTemplateColumns: '1fr minMax(50%, min-content)',
    gridGap: 20,
  },
  notification: {
    padding: 0,
  },
  priceWrap: {
    whiteSpace: 'nowrap',
  },
}));
