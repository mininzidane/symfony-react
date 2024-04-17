import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    ...mixins.font(11, 15),
    padding: [[8, 14]],
    background: '#FFF1D2',
    margin: [[1, -14, 8]],
  },
}));
