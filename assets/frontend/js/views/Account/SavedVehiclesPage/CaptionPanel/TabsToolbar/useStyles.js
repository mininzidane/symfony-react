import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    backgroundColor: '#F6F6F6',

    '& button': {
      ...mixins.font(14, 18),
      color: 'inherit',
      padding: [[5, 0]],
    },
  },
}));
