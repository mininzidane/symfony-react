import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    width: 88,
    height: 66,
    position: 'relative',
  },
  button: {
    ...mixins.font(12, 16),
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: [[3, 5]],
    backgroundColor: 'rgba(0, 0, 0, .6)',
    color: '#FFF',
    transition: 'background .2s ease',
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0)',
    },
  },
}));
