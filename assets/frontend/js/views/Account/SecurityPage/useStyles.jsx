import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  content: {
    display: 'flex',
    marginTop: 21,
    marginBottom: 50,

    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  form: {
    display: 'flex',
    flexGrow: 1,
  },
  annotation: {
    display: 'flex',
    flexGrow: 1,

    [breakpoints.down('md')]: {
      maxWidth: '30%',
    },

    [breakpoints.down('sm')]: {
      maxWidth: 'initial',
    },
  },
}));
