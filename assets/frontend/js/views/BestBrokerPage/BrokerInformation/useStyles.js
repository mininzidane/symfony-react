import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    '& p': {
      margin: '8px 0 20px',
      '&:last-child': {
        marginBottom: 0,
      },
    },
  },
}));
