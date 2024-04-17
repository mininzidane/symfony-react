import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  body: {
    backgroundColor: '#fff',
    minHeight: 275,
  },
  loader: {
    minHeight: '200px',
    position: 'relative',
  },
  card: {
    backgroundColor: '#F1F1F8',
    borderRadius: '6px',
    fontSize: '18px',
    lineHeight: '24px',
    textAlign: 'center',
    padding: '22px 14px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: '16px',
    lineHeight: '20px',
    color: '#333333',
    marginBottom: 15,
  },
  radioGroup: {
    minHeight: '160px',
    '& .radio-button': {
      marginBottom: 14,
    },
  },
  agreement: {
    fontSize: '12px',
    lineHeight: '16px',
    textAlign: 'center',
    color: '#828282',
    paddingTop: 8,
  },
  warningIcon: {
    marginBottom: 12,
  },
}));
