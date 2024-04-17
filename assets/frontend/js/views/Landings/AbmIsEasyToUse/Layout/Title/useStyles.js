import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#000',
    padding: [[9, 0]],
  },
  content: {
    display: 'flex',
    alignItems: 'center',
  },
  wideContent: {
    justifyContent: 'space-between',
  },
  wideContainer: {
    maxWidth: 'none',
    paddingLeft: 42,
    paddingRight: 30,
  },
  text: {
    color: '#FFFFFF',
    textTransform: 'uppercase',
    fontSize: '24px',
    fontWeight: 700,
    paddingLeft: 65,

    [breakpoints.down('md')]: {
      display: 'none',
    },
  },
  wideTitle: {
    flexGrow: 1,
    paddingLeft: 0,
    textAlign: 'center',
  },
  abmLogo: {
    display: 'block',
    width: 120,

    [breakpoints.down('sm')]: {
      width: 90,
    },
  },
}));
