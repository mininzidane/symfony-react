import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '3fr 1fr',
    gridGap: 30,
    paddingTop: 16,
    paddingBottom: 50,
    alignItems: 'flex-start',
    '@media (max-width: 1440px)': {
      gridTemplateColumns: '2fr 1fr',
    },

    [breakpoints.down('lg')]: {
      gridGap: 20,
    },

    [breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      gridGap: 0,
    },

    [breakpoints.down('sm')]: {
      paddingTop: 13,
      paddingBottom: 20,
    },
  },
}));
