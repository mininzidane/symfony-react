import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#F1F1F8',
    paddingTop: 36,
    paddingBottom: 36,
    overflow: 'hidden',

    '@media (max-width: 1440px)': {
      maxWidth: 1170,
      margin: '0 auto',
      paddingLeft: 15,
      paddingRight: 15,
    },

    [breakpoints.down('lg')]: {
      maxWidth: 1004,
    },

    [breakpoints.down('md')]: {
      maxWidth: 768,
    },

    [breakpoints.down('sm')]: {
      paddingTop: 32,
      paddingBottom: 35,
    },
  },
  cards: {
    display: 'grid',
    gridGap: '12px',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',

    '@media (max-width: 1440px)': {
      gridTemplateColumns: '1fr 1fr',
      gridGap: '20px',
    },

    [breakpoints.down('xs')]: {
      gridTemplateColumns: '1fr',
    },
  },
}));
