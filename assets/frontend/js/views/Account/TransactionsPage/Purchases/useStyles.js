import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  table: {
    marginTop: 20,

    [breakpoints.down('sm')]: {
      marginTop: 15,
    },
  },
  loaderContainer: {
    position: 'relative',
    minHeight: 150,
  },
  noResults: {
    fontSize: 20,
    lineHeight: '27px',
    fontWeight: 300,
    marginTop: 10,
  },
}));
