import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    ...mixins.font(16, 21),
    '& h2': {
      ...mixins.font(16, 21, 700),
      display: 'inline-block',
      margin: 0,
    },
    '& + $root': {
      marginTop: 20,
    },
  },
}));
