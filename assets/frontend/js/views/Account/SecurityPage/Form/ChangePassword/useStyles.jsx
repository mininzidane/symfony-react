import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginTop: 50,
  },
  title: {
    ...mixins.font(24, 30, 300),
    color: '#333',
    margin: 0,
    [breakpoints.down('sm')]: {
      ...mixins.font(16, 20, 700),
    },
  },
  field: {
    marginTop: 20,
    height: 53,
  },
  submitButton: {
    marginTop: 20,
  },
  form: {
    marginTop: -5,
  },
}));
