import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    margin: 0,
    color: '#333',
    display: 'grid',
    minWidth: 0,
  },
  title: {
    margin: 0,
    ...mixins.font(28, 36, 700),

    [breakpoints.down('sm')]: {
      ...mixins.font(18, 24),
    },
  },
}));
