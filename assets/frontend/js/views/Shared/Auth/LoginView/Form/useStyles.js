import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  field: {
    marginTop: 20,
  },
  forgotPassword: {
    marginTop: 9,
    ...mixins.font(14, 19, 400),
    textAlign: 'end',
  },
  agreement: {
    ...mixins.font(13, 19, 400),
    textAlign: 'center',
    marginTop: 20,

    [breakpoints.down('sm')]: {
      ...mixins.font(12, 16),
    },
  },
  submitButton: {
    marginTop: 16,
  },
}));
