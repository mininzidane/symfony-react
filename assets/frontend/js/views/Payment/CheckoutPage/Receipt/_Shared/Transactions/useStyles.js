import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  tableRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '15px 20px',
    fontSize: '14px',
    borderRadius: '4px',

    '&.is-transaction': {
      backgroundColor: '#F2F2F2',
    },

    '&.is-total': {
      backgroundColor: '#E0E0E0',
    },
  },
}));
