import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    padding: [[24, 20, 20]],
    backgroundColor: '#FCFAEC',
    [breakpoints.down('md')]: {
      marginTop: 14,
    },
  },
  title: {
    ...mixins.font(18, 24),
    [breakpoints.down('sm')]: {
      ...mixins.font(14, 20),
    },
  },
  errorMessage: {
    marginTop: 10,
  },
}));
