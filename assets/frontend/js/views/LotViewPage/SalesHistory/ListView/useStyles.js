import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  entry: {
    '&:not(:first-child)': {
      marginTop: 24,
    },
  },
}));
