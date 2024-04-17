import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  supportedFiles: {
    fontSize: '12px',
    lineHeight: '16px',
    color: '#828282',
  },
  wrapText: {
    marginBottom: '18px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  cta: {
    color: '#2158F5',
    borderBottom: '1px dashed #2158F5',
    whiteSpace: 'nowrap',
    '&:hover': {
      borderBottomColor: 'transparent',
    },
  },
}));
