import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gridGap: 30,
    paddingTop: 20,
    paddingBottom: 50,

    [breakpoints.down('lg')]: {
      gridGap: 20,
    },

    [breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      gridGap: 0,
    },

    [breakpoints.down('sm')]: {
      paddingTop: 15,
      paddingBottom: 20,
    },
  },
  layoutContainer: {
    paddingTop: 24,
    paddingBottom: 45,
    display: 'grid',
    gridTemplateColumns: '5fr 3fr',
    alignItems: 'start',
    gridGap: 24,
    minHeight: 730,

    [breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      gridGap: 20,
      minHeight: 0,
    },

    [breakpoints.down('sm')]: {
      paddingBottom: 30,
      paddingTop: 14,
      gridGap: 14,
    },
  },
}));
