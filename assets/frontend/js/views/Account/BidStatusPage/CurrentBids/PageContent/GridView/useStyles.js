import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gridGap: 20,

    '@media (max-width: 1368px)': {
      gridTemplateColumns: 'repeat(auto-fill, minmax(312px, 1fr))',
      gridGap: 12,
    },

    [breakpoints.down('sm')]: {
      gridGap: 14,
    },
  },
}));
