import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    ...mixins.font(12, 20, 700),
    color: '#333',
    whiteSpace: 'nowrap',
  },
}));
