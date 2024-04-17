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
  backToMyCards: {
    textAlign: 'center',
    borderBottom: '1px solid rgba(196,196,196,0.4)',
    paddingBottom: '16px',
    paddingTop: '8px',
    marginTop: '0',
  },
  errorMessage: {
    marginTop: 10,
  },
}));
