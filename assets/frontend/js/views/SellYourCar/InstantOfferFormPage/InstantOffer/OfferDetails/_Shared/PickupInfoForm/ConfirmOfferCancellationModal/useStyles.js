import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {},
  content: {
    fontSize: '14px',
    lineHeight: '19px',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#F6F6F6',
    border: 'none',
    paddingTop: 0,
    paddingBottom: 20,
    gap: '18px',
    [breakpoints.down('sm')]: {
      gap: 0,
      flexDirection: 'column',
    },
  },
  cancelCta: {
    [breakpoints.down('sm')]: {
      marginTop: 14,
    },
  },
}));
