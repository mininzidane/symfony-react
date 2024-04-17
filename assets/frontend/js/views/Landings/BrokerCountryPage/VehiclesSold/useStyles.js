import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[45, 0, 60]],
    backgroundColor: '#F1F1F8',

    [breakpoints.down('sm')]: {
      padding: [[30, 0, 40]],
    },
  },
  title: {
    fontSize: 32,
    lineHeight: '38px',
    fontWeight: 400,
    margin: 0,
    color: '#000',
    textAlign: 'center',

    [breakpoints.down('md')]: {
      fontSize: 24,
      lineHeight: '32px',
    },
  },
  container: {
    maxWidth: 1000,
  },
  moreLinkWrap: {
    marginTop: 25,
    textAlign: 'center',
    fontSize: 16,

    [breakpoints.down('sm')]: {
      marginTop: 25,
    },
  },
}));
