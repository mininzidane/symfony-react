import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    padding: 14,
    position: 'absolute',
    zIndex: 300,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    visibility: 'hidden',
    transition: 'opacity .3s ease',

    '&.is-visible': {
      visibility: 'visible',
      opacity: 1,
    },
  },
  grid: {
    display: 'grid',
    placeContent: 'center',
    textAlign: 'center',
    justifyItems: 'center',
    backgroundColor: 'rgba(255, 241, 210, .95)',
    height: '100%',
    paddingBottom: 20,
  },
  title: {
    paddingTop: 16,
    paddingBottom: 5,
    fontWeight: 700,
  },
}));
