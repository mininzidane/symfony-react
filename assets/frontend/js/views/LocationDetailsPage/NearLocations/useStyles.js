import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    paddingLeft: 0,
    paddingRight: 0,
    maxWidth: 'initial',
    paddingBottom: 20,

    [breakpoints.down('sm')]: {
      marginTop: -10,
      marginBottom: -15,
    },
  },
  h2: {
    fontSize: 24,
    lineHeight: 1.75,

    [breakpoints.down('sm')]: {
      fontSize: 18,
    },
  },
  card: {
    '@media(max-width: 1780px)': {
      '&:nth-child(n + 5)': {
        display: 'none',
      },
    },

    [breakpoints.down('lg')]: {
      '&:nth-child(n + 4)': {
        display: 'none',
      },
    },

    [breakpoints.down('md')]: {
      overflow: 'hidden',
    },

    [breakpoints.down('sm')]: {
      minWidth: 280,
      display: 'block !important',
    },
  },
  scrollContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridGap: 20,
    margin: [[18, -2, 2]],
    padding: 2,

    '@media(max-width: 1780px)': {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },

    [breakpoints.down('lg')]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridGap: 18,
    },

    [breakpoints.down('sm')]: {
      display: 'flex',
      marginRight: -14,
      paddingRight: 14,
    },
  },
}));
