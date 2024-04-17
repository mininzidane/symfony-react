import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    textAlign: 'center',
  },
  caption: {
    ...mixins.font(18, 24, 700),
    marginTop: 15,
    marginBottom: 0,
    textAlign: 'center',
  },
  desc: {
    ...mixins.font(16, 22, 400),
    color: '#48484A',
    marginTop: 10,
  },
  icon: {
    minHeight: 50,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',

    [breakpoints.down('xs')]: {
      minHeight: 'auto',
    },
  },
}));
