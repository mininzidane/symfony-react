import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '16px 20px 20px',
    backgroundColor: '#fff',
    borderRadius: '4px 0 0 4px',
    [breakpoints.down('sm')]: {
      borderRadius: '0 0 4px 4px',
    },
  },
  title: {
    fontSize: '18px',
    lineHeight: '24px',
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  row: {
    display: 'grid',
    gridGap: '14px',
    gridTemplateColumns: 'minMax(30%, 1fr) minMax(30%, auto)',
    fontSize: 14,
    lineHeight: '16px',
    paddingTop: '8px',
    paddingBottom: '8px',
    color: '#333',
    '& > div:nth-child(even)': {
      textAlign: 'right',
    },
    '& + &': {
      borderTop: '1px solid #E0E0E0',
    },
  },
  note: {
    wordBreak: 'break-all',
  },
  acceptedPrice: {
    fontSize: '20px',
    lineHeight: '22px',
  },
  cancel: {
    fontSize: '14px',
    lineHeight: '16px',
    marginTop: 3,
  },
  warningIcon: {
    marginBottom: '-2px',
    marginTop: '-6px',
    marginRight: '3px',
  },
}));
