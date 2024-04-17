import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#F8F8F8',
  },
  container: {
    display: 'grid',
    gridTemplateColumns: '100%',
    gridGap: 35,
    paddingTop: 25,
    paddingBottom: 35,

    [breakpoints.down('md')]: {
      gridGap: 30,
    },

    [breakpoints.down('sm')]: {
      gridGap: 20,
      paddingBottom: 20,
      paddingTop: 20,
    },
  },
}));
