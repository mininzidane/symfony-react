import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 32,
  },
  title: {
    ...mixins.font(24, 32, 400),
    margin: [[16, 0, 0]],
    color: '#4F4F4F',
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      marginTop: 24,
    },
  },
  descriptions: {
    margin: [[10, 0, 24]],
    textAlign: 'center',
    color: '#4F4F4F',
  },
}));
