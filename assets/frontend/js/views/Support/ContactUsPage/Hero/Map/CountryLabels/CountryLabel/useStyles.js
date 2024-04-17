import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    position: 'absolute',
    background: '#FFFFFF',
    color: '#000',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.2)',
    borderRadius: 12,
    fontSize: 12,
    lineHeight: '18px',
    height: 18,
    paddingLeft: 7,
    paddingRight: 7,
    pointerEvents: 'none',
    opacity: 0,
    textTransform: 'uppercase',

    '&.is-visible': {
      opacity: 1,
    },
  },
}));
