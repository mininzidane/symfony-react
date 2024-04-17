import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
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
  currentEmail: {
    border: '1px solid #B7B5B3',
    borderRadius: 4,
    padding: [[0, 14]],
  },
  label: {
    display: 'flex',
    height: 16,
    overflow: 'visible',
    lineHeight: '32px',
    fontSize: '12px',
    color: '#4B5158',
  },
  value: {
    height: 30,
    color: '#7a7a7a',
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: 6,
  },
  form: {
    marginTop: -5,
  },
}));
