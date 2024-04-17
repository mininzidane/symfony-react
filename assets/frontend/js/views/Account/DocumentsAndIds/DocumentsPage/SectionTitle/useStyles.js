import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    ...mixins.font(24, 30, 300),
    margin: 0,
    color: '#333',
    [breakpoints.down('sm')]: {
      ...mixins.font(16, 20, 700),
    },
  },
}));
