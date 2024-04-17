import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    marginTop: 15,

    '@media (max-width: 1368px)': {
      marginTop: 10,
    },
  },
}));
