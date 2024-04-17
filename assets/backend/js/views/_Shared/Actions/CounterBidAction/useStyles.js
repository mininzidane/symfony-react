import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  modalBody: ({ modalState }) => ({
    padding: modalState === 'bidding' ? 0 : '20px',
  }),
  table: {
    marginBottom: '0',
  },
  label: {
    fontWeight: 'bold',
  },
}));
