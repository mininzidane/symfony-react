import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    marginTop: 32,
  },
  slide: {
    marginBottom: 5,
  },
  swiper: {
    margin: [[0, -10]],
    padding: [[0, 10]],
  },
  bullets: {
    marginTop: 18,
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 4,
  },
  bullet: {
    ...mixins.extraHitbox(4),
    position: 'relative',
    width: 7,
    height: 7,
    margin: [[0, 4]],
    borderRadius: '50%',
    border: '1px solid #2158F5',
    outline: 'none',
    cursor: 'pointer',
  },
  activeBullet: {
    color: 'blue',
    backgroundColor: '#2158F5',
  },
}));
