import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    padding: 2,
    display: 'flex',
  },
  stats: {
    padding: [[6, 10, 2, 10]],
    width: 'calc(100vw - 133px)',
    position: 'relative',
  },
  stat: {
    ...mixins.font(12, 16, 400),
    display: 'flex',
  },
  label: {
    color: '#828282',
    paddingRight: 5,
  },
  arrow: {
    ...mixins.extraHitbox(),
    position: 'absolute',
    right: 18,
    bottom: 30,
  },
}));
