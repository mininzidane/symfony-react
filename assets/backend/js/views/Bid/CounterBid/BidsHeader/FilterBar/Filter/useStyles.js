import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    padding: 6,
    border: '1px solid #E5E6E7',
    borderRadius: 4,

    '&:not(:last-child)': {
      marginRight: 10,
    },

    '& label': {
      margin: 0,
      fontWeight: 400,
    },
  },
  active: {
    '& label': {
      fontWeight: 700,
    },
  },
}));
