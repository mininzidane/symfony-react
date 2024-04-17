import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  wrapper: {
    maxWidth: 600,
  },
  title: {
    fontSize: '16px',
    marginBottom: 13,
    marginRight: 20,
  },
  form: {
    display: 'flex',
    alignItems: 'flex-start',

    [breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'stretch',
    },
  },
  phoneInput: {
    marginRight: 12,
    width: 260,

    [breakpoints.down('xs')]: {
      width: '100%',
      marginRight: 0,
    },
  },
  submitButton: {
    width: 'auto',
    minWidth: 160,

    [breakpoints.down('xs')]: {
      width: '100%',
      marginTop: 11,
    },
  },
  tooltipTrigger: {
    backgroundColor: '#828282',
  },
}));
