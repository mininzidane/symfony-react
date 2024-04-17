import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    marginTop: 20,
    paddingTop: 25,
    paddingBottom: 16,
    borderRadius: 4,
    border: '1px solid #C4C4C4',
  },
  title: {
    borderLeft: '2px solid #C4C4C4',
    marginBottom: 12,

    '& span': {
      display: 'block',
      padding: [[3, 10, 3, 20]],
      fontSize: 16,
      lineHeight: '24px',
      fontWeight: 700,
    },
  },
  content: {
    padding: [[0, 24]],
  },
  subtotal: {
    marginBottom: 20,
  },
}));
