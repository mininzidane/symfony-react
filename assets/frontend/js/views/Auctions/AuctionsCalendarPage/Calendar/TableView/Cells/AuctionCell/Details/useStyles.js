import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    paddingTop: '12px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '14px',
    lineHeight: '18px',
    fontWeight: '400',
    minHeight: '30px',
    padding: '6px 0',
    '&:not(:first-child)': {
      borderTop: '1px solid #e3e3e3',
      paddingTop: '5px',
    },
    '& > span:first-child': {
      paddingRight: '10px',
    },
    '& > div:last-child': {
      textAlign: 'right',
    },
  },
  status: {
    padding: '0px 5px',
    fontSize: '14px',
    fontWeight: '700',
    lineHeight: '20px',
    whiteSpace: 'nowrap',
    borderRadius: '4px',
  },
}));
