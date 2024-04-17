import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#fff',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 33%',
    gridGap: 38,
    paddingTop: 45,
    paddingBottom: 45,
    alignItems: 'flex-start',
    [breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      paddingTop: 25,
      paddingBottom: 25,
      gridGap: 25,
    },
  },
  main: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: 38,
    [breakpoints.down('md')]: {
      gridGap: 25,
    },
  },
}));
