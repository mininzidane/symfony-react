import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  sortable: {
    display: 'inline-flex',
    alignItems: 'center',
    outline: 'none',
  },
  arrow: {
    marginLeft: 5,
    width: 10,
    height: 10,
    transition: 'transform .3s ease',
  },
  arrowRotate: {
    transform: 'rotate(180deg)',
  },
}));
