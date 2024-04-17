import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: 80,

    [breakpoints.down('lg')]: {
      gridGap: 50,
    },

    [breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      gridGap: 30,
    },

    [breakpoints.down('sm')]: {
      gridGap: 20,
    },
  },
  card: {
    paddingBottom: 16,

    [breakpoints.down('sm')]: {
      paddingBottom: 12,
      gridGap: 10,
    },
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));
