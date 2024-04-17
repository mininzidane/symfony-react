import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#fff',
    padding: [[20, 0]],
  },
  container: {
    display: 'flex',
    gap: 34,
    overflowX: 'auto',
    marginTop: 20,
    paddingBottom: 2,
  },

  [breakpoints.down('lg')]: {
    '& > *:last-child': {
      display: 'none',
    },
    paddingBottom: 2,
  },

  [breakpoints.down('lg')]: {
    '& > *:last-child': {
      display: 'none',
    },
  },
}));
