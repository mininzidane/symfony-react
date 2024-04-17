import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    maxWidth: 250,
  },
  img: {
    display: 'block',
    margin: '0 auto',
  },
  desc: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 400,

    [breakpoints.down('sm')]: {
      marginTop: 10,
    },
  },
  title: {
    fontSize: 18,
    lineHeight: '24px',
    fontWeight: 700,
  },
  subtitle: {
    marginTop: 5,
    fontSize: 14,
    lineHeight: '20px',
    fontWeight: 400,
  },
}));
