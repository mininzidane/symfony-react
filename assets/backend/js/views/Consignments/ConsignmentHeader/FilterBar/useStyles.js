import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  filters: {
    display: 'flex',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  input: {
    marginBottom: 0,
    minWidth: '120px',
  },
  select: {
    minWidth: '236px',
  },
}));
