import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    color: '#333',
    marginLeft: '14px',
    marginRight: '14px',
    display: 'block',
    marginTop: '8px',
    marginBottom: '8px',
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
    '&.is-price': {
      paddingTop: '2px',
      paddingBottom: '3px',
      '& > span:first-child': {
        paddingTop: '3px',
      },
    },
  },
  status: {
    padding: '0px 5px',
    fontSize: '14px',
    textAlign: 'center',
    fontWeight: '700',
    lineHeight: '20px',
    whiteSpace: 'nowrap',
    borderRadius: '4px',
    textTransform: 'uppercase',
  },
  amount: {
    fontSize: '20px',
    lineHeight: '25px',
    fontWeight: '700',
    '& > span:last-child': {
      fontWeight: '300',
    },
  },
}));
