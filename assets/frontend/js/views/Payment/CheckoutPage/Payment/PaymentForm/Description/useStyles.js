import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    ...mixins.font(14, 20, 400),
    padding: [[18, 14, 22]],
    color: '#333333',

    [breakpoints.down('sm')]: {
      padding: [[12, 14]],
    },
  },
}));
