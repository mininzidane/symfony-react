import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  button: {
    '&:not(:last-child)': {
      marginBottom: 10,
    },
  },
}));
