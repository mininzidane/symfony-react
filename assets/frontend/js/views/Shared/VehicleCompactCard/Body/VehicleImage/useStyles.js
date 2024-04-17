import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'block',
    width: 130,
    height: 98,
    position: 'relative',
  },
  viewAll: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: [[4, 2]],
    width: '100%',
    display: 'grid',
    placeContent: 'center',
    background: 'rgba(0, 0, 0, .6)',
    color: '#FFF',
    transition: 'background .2s ease',

    '&:hover': {
      background: 'rgba(0, 0, 0)',
    },
  },
}));
