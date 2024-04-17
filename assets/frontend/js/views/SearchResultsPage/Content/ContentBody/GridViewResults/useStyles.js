import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gridGap: 20,
    marginTop: 24,

    '@media (max-width: 1368px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(312px, 1fr))',
      gridGap: 12,
    },

    [breakpoints.down('sm')]: {
      marginTop: 8,
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
