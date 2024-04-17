import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filters: {
    display: 'flex',
    alignItems: 'center',
  },
  filterLabel: {
    marginRight: '5px',
  },
  checkboxes: {
    marginRight: '10px',
  },
  select: {
    minWidth: '130px',
  },
}));
