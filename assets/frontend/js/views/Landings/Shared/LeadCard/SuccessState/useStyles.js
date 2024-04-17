import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    paddingBottom: 30,

    [breakpoints.down('sm')]: {
      paddingTop: 30,
      height: 362,
    },
  },
  title: {
    ...mixins.font(28, 34),
    textAlign: 'center',
    marginTop: 20,

    [breakpoints.down('sm')]: {
      ...mixins.font(22, 27),
    },
  },
  desc: {
    ...mixins.font(14, 20),
    textAlign: 'center',
    marginTop: 10,
  },
}));
