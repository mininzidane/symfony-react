import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: 14,

    [breakpoints.down('lg')]: {
      gridTemplateColumns: '1fr',
      gridGap: 10,
    },
  },
}));
