import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 26,
    paddingRight: 26,

    [breakpoints.down('sm')]: {
      paddingRight: 14,
    },
  },
  body: {
    flexGrow: 1,
    position: 'relative',
    paddingRight: 32,

    [breakpoints.down('sm')]: {
      paddingRight: 24,
    },
  },
  closeButton: {
    flexShrink: 0,
    marginLeft: 15,
    width: 16,
    height: 16,
    marginTop: 8,
  },
}));
