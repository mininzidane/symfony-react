import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: ({ hasWatchlist }) => ({
    display: 'grid',
    gridTemplateColumns: hasWatchlist ? '1fr 30px' : '1fr',
    gridGap: 14,
    alignItems: 'start',

    [breakpoints.down('sm')]: {
      alignItems: 'center',
    },
  }),
}));
