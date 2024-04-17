import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  auctionBlock: {
    padding: [[25, 20]],
    background: '#E4E2E0',
  },
  auctionStatus: {
    marginBottom: 16,
    fontSize: 14,
    lineHeight: '19px',
    color: 'black',
  },
  contact: {
    display: 'flex',

    '&:not(:first-child)': {
      marginTop: 20,
    },
  },
  contactText: {
    marginLeft: 10,
    fontSize: 16,
    lineHeight: '18px',
    color: '#333',

    '&.is-address': {
      lineHeight: '20px',
    },

    '& a': {
      display: 'block',
      lineHeight: '18px',
    },
  },
}));
