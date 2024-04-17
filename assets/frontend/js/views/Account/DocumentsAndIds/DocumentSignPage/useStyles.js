import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    paddingTop: 28,
    paddingBottom: 50,

    [breakpoints.down('sm')]: {
      paddingTop: 18,
      paddingBottom: 40,
    },
  },
  title: {
    ...mixins.font(28, 34, 300),
    margin: 0,

    [breakpoints.down('sm')]: {
      ...mixins.font(20, 26),
    },
  },
  signIframeWrap: {
    marginTop: 30,
    position: 'relative',
    paddingBottom: '56.25%',
    backgroundColor: '#f2f2f2',

    [breakpoints.down('sm')]: {
      marginTop: 20,
      paddingBottom: '200%',
    },

    '& iframe': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#eee',
    },
  },
  cookiesWrap: {
    margin: [[0, 0, 50]],

    [breakpoints.down('sm')]: {
      margin: 0,
    },
  },
  warning: {
    backgroundColor: '#FFF1D2',
    padding: [[22, 25]],

    [breakpoints.down('sm')]: {
      padding: '14px',
      margin: '-18px -14px 0px',
      paddingBottom: '20px',
    },
  },
  warningText: {
    marginTop: 12,
  },
  chromeIcon: {
    width: 42,
    height: 42,
    marginTop: 28,
  },
  cookiesTitle: {
    fontWeight: '700',
    fontSize: '20px',
    lineHeight: '27px',
    marginTop: '10px',
  },
  caption: {
    textAlign: 'center',
  },
}));
