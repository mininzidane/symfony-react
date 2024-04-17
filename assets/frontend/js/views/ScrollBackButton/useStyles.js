import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    ...mixins.flex('center', 'center'),
    position: 'fixed',
    bottom: 50,
    right: 50,
    width: 50,
    height: 50,
    zIndex: 300,
    backgroundColor: '#e9e9e9',
    borderRadius: 2,
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.16), 0 0 10px rgba(0, 0, 0, 0.16)',
    border: '1px solid #fff',
    cursor: 'pointer',
    outline: 'none',
    transition: 'all .25s cubic-bezier(0.4, 0, 0.2, 1) 0ms !important',

    '&:hover': {
      backgroundColor: '#F1F1F1',
    },
  },
}));
