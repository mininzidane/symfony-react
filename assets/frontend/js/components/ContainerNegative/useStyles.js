import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    marginLeft: ({ margin }) => -1 * margin,
    marginRight: ({ margin }) => -1 * margin,
  },
}));
