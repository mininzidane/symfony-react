import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 5,

    '&::after': {
      content: '""',
      height: '1px',
      width: '100%',
      background: '#555',
      position: 'absolute',
      top: 13,
    },

    '& span': {
      display: 'inline-block',
      padding: [[5, 10]],
      backgroundColor: '#1D1E20',
      position: 'relative',
      zIndex: 2,
      color: '#555',
    },
  },
}));
