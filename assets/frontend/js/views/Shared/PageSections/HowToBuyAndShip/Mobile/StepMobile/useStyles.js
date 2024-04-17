import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    position: 'relative',
    height: 290,
    display: 'flex',
    alignItems: 'center',
  },
  dot: {
    position: 'absolute',
    top: '50%',
    marginTop: -15,
    left: 0,
    zIndex: 2,
    transform: 'rotate(90deg)',

    '&.is-opposite': {
      left: 'auto',
      right: 0,
      transform: 'rotate(-90deg)',
    },
  },
  content: {
    textAlign: 'center',
    paddingLeft: 25,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    '&.is-opposite': {
      paddingRight: 25,
      paddingLeft: 0,
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
