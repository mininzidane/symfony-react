import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '2fr 3fr',
    backgroundColor: '#FFF',
    borderRadius: 4,
    border: '1px solid #E0E0E0',
    overflow: 'hidden',

    [breakpoints.down('lg')]: {
      gridTemplateColumns: '1fr',
    },
  },
  info: {
    padding: [[18, 20]],
    gridTemplateColumns: '1fr',
  },
  map: {
    [breakpoints.down('lg')]: {
      height: 350,
    },
  },
}));
