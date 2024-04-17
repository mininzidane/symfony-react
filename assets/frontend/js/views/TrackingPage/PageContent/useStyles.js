import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: 20,
    paddingTop: 45,
    paddingBottom: 50,
    alignItems: 'start',

    [breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      gridGap: 0,
    },

    [breakpoints.down('sm')]: {
      paddingTop: 28,
      paddingBottom: 30,
    },
  },
  info: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: 20,
    [breakpoints.down('md')]: {
      marginBottom: 24,
    },
    [breakpoints.down('sm')]: {
      gridGap: 14,
      marginBottom: 14,
    },
  },
}));
