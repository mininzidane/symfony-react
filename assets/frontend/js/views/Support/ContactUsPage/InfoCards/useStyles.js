import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    background: '#FFFFFF',
    padding: [[55, 0]],

    [breakpoints.down('md')]: {
      padding: [[40, 0]],
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 325px)',
    justifyContent: 'space-between',
    justifyItems: 'center',
    alignItems: 'start',
    gridGap: 20,

    [breakpoints.down('lg')]: {
      gridTemplateColumns: 'repeat(3, 1fr)',
    },

    [breakpoints.down('md')]: {
      gridTemplateColumns: '1fr',
      gridGap: 40,
    },
  },
}));
