import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  grid: {
    display: 'grid',
    gap: '20px',
    [breakpoints.down('md')]: {
      gap: '14px',
    },
  },
  gridGroup: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    [breakpoints.down('md')]: {
      gap: '14px',
      gridTemplateColumns: '1fr',
    },
  },
}));
