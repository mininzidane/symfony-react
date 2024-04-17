import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  modalContent: {
    background: '#FFF',
    padding: [[13, 14, 24, 14]],
    maxWidth: 'calc(100vw - 28px)',
    width: 500,
    margin: [[0, 'auto']],
    borderRadius: 4,
    backgroundColor: '#F6F6F6',
    boxShadow: '0 0 50px rgba(0, 0, 0, 0.35)',
  },
  modalHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  modalTitle: {
    fontWeight: 700,
    fontSize: 18,
    lineHeight: '20px',
  },
  closeButton: {
    marginTop: 3,
    marginRight: 2,

    '&:hover': {
      opacity: 0.75,
    },
  },
}));
