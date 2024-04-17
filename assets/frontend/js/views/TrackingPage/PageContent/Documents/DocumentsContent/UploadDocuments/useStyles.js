import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  title: {
    ...mixins.font(16, 24, 400),
    color: '#000',
    marginBottom: '10px',
  },
  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  button: {
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      width: '100% !important',
    },
  },
}));
