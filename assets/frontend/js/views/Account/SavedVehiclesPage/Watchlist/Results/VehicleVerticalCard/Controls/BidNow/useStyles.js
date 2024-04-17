import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  caption: {
    ...mixins.font(12, 20, 400),
    whiteSpace: 'nowrap',
    textTransform: 'uppercase',
  },
  value: {
    ...mixins.font(24, 28, 700),
    position: 'relative',
    top: -2,
  },
  button: {
    marginLeft: 10,
    paddingLeft: 6,
    paddingRight: 6,
  },
  info: {
    width: '100%',
  },
}));
