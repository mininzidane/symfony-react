import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  title: {
    textAlign: 'center',
    fontWeight: 300,
    fontSize: '32px',
    lineHeight: '48px',
    margin: 0,

    [breakpoints.down('sm')]: {
      fontSize: '24px',
      lineHeight: '32px',
    },
  },
  subtitle: {
    textAlign: 'center',
    fontWeight: 300,
    fontSize: '24px',
    lineHeight: '32px',
    paddingTop: 4,
    margin: 0,

    [breakpoints.down('sm')]: {
      fontSize: '18px',
      lineHeight: '24px',
    },
  },
}));
