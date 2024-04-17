import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    position: 'relative',
    width: 'calc(100% / 7 * 2)',
    height: 150,

    '&.is-short': {
      width: 'calc(100% / 7)',
    },
  },
  dot: {
    position: 'absolute',
    bottom: -14,
    left: -7,
    zIndex: 2,

    '&.is-opposite': {
      bottom: 'auto',
      left: 'auto',
      top: -14,
      right: -7,
      transform: 'scaleY(-1)',
    },
  },
  content: {
    textAlign: 'center',
    paddingBottom: 20,
    marginLeft: '-100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    '&.is-opposite': {
      marginRight: '-100%',
      marginLeft: 0,
      paddingTop: 30,
    },
  },
  title: {
    display: 'inline-block',
    textTransform: 'uppercase',
    color: '#999999',
    marginTop: 15,
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 700,
  },
  desc: {
    display: 'inline-block',
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 700,
  },
}));
