import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    ...mixins.font(12, 18, 400),
    display: 'block',
  },
  liveLabel: {
    ...mixins.font(12, 18, 700),
    color: '#226900',
    textTransform: 'uppercase',
  },
  soldLabel: {
    ...mixins.font(12, 18, 700),
    color: '#6F130B',
    textTransform: 'uppercase',
  },
}));
