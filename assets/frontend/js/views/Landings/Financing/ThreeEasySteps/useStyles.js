import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    backgroundColor: '#F0F0F7',
    paddingTop: 30,
    paddingBottom: 33,
  },
  container: {
    maxWidth: '100%',
  },
  title: {
    textAlign: 'center',
    ...mixins.font(24, 32, 400),
    marginBottom: 24,
  },
  items: {
    display: 'flex',
    justifyContent: 'center',

    [breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
}));
