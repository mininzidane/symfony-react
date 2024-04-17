import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    padding: [[10, 10, 12]],
    display: 'grid',
    gridGap: 10,
    gridTemplateColumns: '1fr',
    borderTop: '1px solid #F1F1F8',
  },
  info: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));
