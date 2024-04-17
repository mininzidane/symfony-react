import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  value: {
    display: 'inline-block',
    marginRight: 4,
  },
  card: {
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
