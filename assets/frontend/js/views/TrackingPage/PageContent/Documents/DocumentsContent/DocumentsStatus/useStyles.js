import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    flexDirection: 'column',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,

    [breakpoints.down('md')]: {
      minHeight: 300,
    },
  },
  title: {
    ...mixins.font(16, 24, 400),
    color: '#000',
    marginTop: 16,
    textAlign: 'center',
  },
}));
