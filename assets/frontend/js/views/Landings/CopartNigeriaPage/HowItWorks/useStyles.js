import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[70, 0, 120]],
    backgroundColor: '#FFF',
    borderTop: '1px solid #E3E3E3',

    [breakpoints.down('lg')]: {
      padding: [[60, 0, 100]],
    },

    [breakpoints.down('md')]: {
      padding: [[40, 0, 50]],
    },

    [breakpoints.down('sm')]: {
      padding: [[30, 0, 40]],
    },
  },
  title: {
    margin: 0,
    fontSize: 32,
    lineHeight: '36px',
    fontWeight: 400,
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      fontSize: 24,
      lineHeight: '32px',
    },
  },
}));
