import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  modalWindow: {},
  modalEmbed: {
    display: 'block !important',
    position: 'relative !important',
    opacity: '1 !important',
  },
  modalBody: {
    padding: 0,
    maxHeight: '98vh',
    '& .modal-dialog': {
      margin: '0 !important',
    },
    '& .modal-content': {
      boxShadow: 'none !important',
    },
  },
}));
