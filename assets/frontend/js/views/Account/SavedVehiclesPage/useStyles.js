import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: '3fr 1fr',
    gridGap: 40,
    padding: [[40, 0, 60]],

    [breakpoints.down('lg')]: {
      gridTemplateColumns: '1fr',
      gridGap: 50,
    },

    [breakpoints.down('sm')]: {
      padding: [[25, 0, 30]],
    },
  },
}));
