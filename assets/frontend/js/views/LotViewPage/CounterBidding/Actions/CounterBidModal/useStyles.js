import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  body: {
    backgroundColor: '#fff',
  },
  actions: {
    marginTop: 8,
    display: 'flex',
    flexWrap: 'wrap-reverse',
    marginLeft: '-6px',
    marginRight: '-6px',
  },
  btnWrap: {
    width: 'auto',
    minWidth: '50%',
    flexShrink: '0',
    flexGrow: '1',
    padding: 6,
  },
  grid: {
    border: '1px solid #dddddd',
    display: 'grid',
    padding: '10px 14px',
    gridGap: '24px',
    gridTemplateColumns: '1fr 1fr',
    borderRadius: '4px',
    marginTop: '15px',
    [breakpoints.down('sm')]: {
      gridGap: '6px',
      gridTemplateColumns: '1fr',
    },
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
