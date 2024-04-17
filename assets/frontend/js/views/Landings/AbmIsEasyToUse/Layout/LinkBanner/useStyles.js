import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#fff',
    padding: [[42, 0, 48]],
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    color: '#000',
    fontSize: 32,
    lineHeight: 1.3,
    fontWeight: 400,
    textAlign: 'center',
    maxWidth: 800,
    margin: [[0, 'auto', 30]],
    marginBottom: 42,
  },
  banner: {
    display: 'flex',
    width: '100%',
    marginBottom: 42,
  },
  bannerImg: {
    width: '100%',
  },
  columns: {
    display: 'flex',

    [breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  column: {
    '&:not(:last-child)': {
      marginRight: 38,

      [breakpoints.down('sm')]: {
        marginBottom: 38,
      },
    },
  },
  columnTitle: {
    marginBottom: '15px',
    fontSize: '16px',
    lineHeight: 1.3,
    color: '#000',
    fontWeight: 700,
  },
  columnText: {
    fontSize: '16px',
    lineHeight: 1.3,
  },
}));
