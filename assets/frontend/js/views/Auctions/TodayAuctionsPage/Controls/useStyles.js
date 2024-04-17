import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  sortControl: {
    padding: [[5, 14, 5, 0]],
    flexShrink: 0,
  },
  queryInput: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 200,
    margin: [[5, 0]],
    width: '255px',
    border: '1px solid #828282',
    boxShadow: 'none',

    [breakpoints.down('sm')]: {
      marginBottom: 10,
    },
  },
}));
