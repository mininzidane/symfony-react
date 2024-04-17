import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    '& > div': {
      '&:first-child': {
        paddingTop: 0,
      },
      '&:last-child': {
        paddingBottom: 0,
      },
    },
  },
}));
