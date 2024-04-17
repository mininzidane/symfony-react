import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#F1F1F8',
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 45,
    paddingTop: 40,
  },
  card: {
    paddingBottom: 45,
    paddingTop: 40,
    padding: '0 15px',
    maxWidth: 1040,
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 15px',
    marginTop: 25,

    [breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
}));
