import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    borderRadius: '4px',
    backgroundColor: '#E6ECFD',
  },
  modalBody: {
    backgroundColor: '#fff',
  },
  shippingFormRoot: {
    marginTop: 2,
  },
  shippingFormFooter: {
    margin: '20px -20px -20px -20px',
    padding: '16px 20px 20px 20px',
    [breakpoints.down('sm')]: {
      margin: '14px -14px -14px -14px',
      padding: '16px 14px 14px 14px',
    },
  },
}));
