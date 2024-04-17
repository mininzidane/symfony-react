import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  label: {
    ...mixins.font(12, 16, 400),
    padding: [[2, 24, 2, 6]],
    color: '#333',
  },
  closeButton: {
    display: 'grid',
    placeContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    backgroundColor: 'transparent',
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,

    '&:hover': {
      backgroundColor: '#C4C4C4',
    },
  },
}));
