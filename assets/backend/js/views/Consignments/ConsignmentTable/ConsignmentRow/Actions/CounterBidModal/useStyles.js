import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  grid: {
    border: '1px solid #dddddd',
    display: 'grid',
    padding: '10px 14px',
    gridGap: '24px',
    gridTemplateColumns: '1fr 1fr',
    borderRadius: '4px',
    marginTop: '15px',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '28px',
    padding: '4px 0',
  },
  field: {
    width: '100%',
    maxWidth: '100px',
  },
}));
