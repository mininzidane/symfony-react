import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  footer: {
    justifyContent: 'space-between',
  },
  envelope: {
    paddingTop: '24px',
    '&:first-child': {
      paddingTop: 0,
    },
  },
  envelopeTitle: {
    fontWeight: '300',
    fontSize: '14px',
  },
  vehicle: {
    display: 'grid',
    borderBottom: '1px solid #eee',
    paddingTop: 8,
    paddingBottom: 4,
    '&:last-child': {
      borderBottom: 'none',
      paddingBottom: 2,
    },
  },
  loader: {
    padding: '6px 0 2px 0',
  },
  titlesStats: {
    borderTop: '1px solid #1ab394',
    marginTop: '12px',
    paddingTop: '14px',
    fontSize: '14px',
  },
}));
