import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    position: 'relative',
    display: 'block',
    width: 144,
    height: 108,
  },
  quickView: {
    ...mixins.font(12, 16, 400),
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: [[4, 2]],
    width: '100%',
    display: 'grid',
    placeContent: 'center',
    background: 'rgba(0, 0, 0, .6)',
    color: '#FFF',
    transition: 'background .2s ease',
    cursor: 'pointer',

    '&:hover': {
      background: 'rgba(0, 0, 0)',
    },
  },
}));
