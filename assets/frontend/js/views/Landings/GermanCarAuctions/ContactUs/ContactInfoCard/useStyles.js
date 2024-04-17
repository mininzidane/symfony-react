import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    backgroundColor: '#FFF',
    borderRadius: 4,
    border: '1px solid #E0E0E0',
    overflow: 'hidden',
    boxShadow: '0px 1px 2px rgb(0, 0, 0, 25%)',

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
