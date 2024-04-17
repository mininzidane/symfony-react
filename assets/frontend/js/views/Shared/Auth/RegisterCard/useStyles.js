import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#FFF',
    borderRadius: 4,
    padding: [[0, 35, 25]],
  },
  title: {
    padding: [[22, 0]],
    fontSize: 24,
    lineHeight: '32px',
    fontWeight: 700,
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      fontSize: 22,
    },
  },
  footerLogin: {
    marginTop: 15,
    textAlign: 'center',
  },
}));
