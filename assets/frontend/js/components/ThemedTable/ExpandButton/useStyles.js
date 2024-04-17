import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    ...mixins.font(14, 20, 400),
    color: '#2158F5',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 14,
    cursor: 'pointer',
    border: '1px solid #E0E0E0',
    borderTop: 'none',
    width: '100%',
    backgroundColor: '#F6F9FD',
    transition: '.2s ease background',
    textDecoration: 'none !important',

    '&:hover': {
      textDecoration: 'underline !important',
    },
  },
}));
