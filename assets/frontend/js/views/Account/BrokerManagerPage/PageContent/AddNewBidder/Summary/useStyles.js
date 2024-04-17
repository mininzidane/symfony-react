import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    padding: [[18, 20, 20]],
    backgroundColor: '#FCFAEC',
    [breakpoints.down('md')]: {
      marginTop: 14,
    },
    [breakpoints.up('lg')]: {
      position: 'sticky',
      top: '110px',
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
  cancel: {
    ...mixins.font(16, 24),
    display: 'flex',
    justifyContent: 'center',
    marginTop: '15px',
    marginBottom: '-4px',
  },
}));
