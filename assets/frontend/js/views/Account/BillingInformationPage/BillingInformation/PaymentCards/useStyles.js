import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    marginBottom: '16px',
  },
  title: {
    ...mixins.font(24, 30, 300),
    marginTop: 0,
    marginBottom: 15,
    color: '#333',
    [breakpoints.down('sm')]: {
      ...mixins.font(16, 20, 700),
      marginBottom: 16,
    },
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '32px',
    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      gridGap: '15px',
    },
  },
  loader: {
    minHeight: '220px',
    position: 'relative',
  },
  noResults: {
    color: '#828282',
    marginTop: '-3px',
    marginBottom: '18px',
  },
}));
