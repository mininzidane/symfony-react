import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  controls: {
    display: 'flex',
    alignItems: 'center',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  toolbar: {
    ...mixins.font(24, 32, 400),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    [breakpoints.down('sm')]: {
      ...mixins.font(18, 24),
    },
  },
}));
