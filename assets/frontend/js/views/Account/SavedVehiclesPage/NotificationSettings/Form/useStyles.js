import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    padding: [[8, 18, 14]],
    width: '100%',
  },
  block: {
    padding: [[12, 0]],
    '&:not(:first-child)': {
      borderTop: '1px solid #C4C4C4',
    },
  },
  label: {
    ...mixins.font(14, 20, 600),
    marginBottom: 10,
  },
}));
