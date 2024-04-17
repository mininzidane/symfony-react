import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gridGap: 20,

    '@media(min-width: 1740px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    },

    [breakpoints.down('sm')]: {
      gridGap: 14,
    },
  },
  adsContainer: {
    display: 'grid',
    placeItems: 'center',
    gridColumnStart: 1,
    gridColumnEnd: -1,
  },
}));
