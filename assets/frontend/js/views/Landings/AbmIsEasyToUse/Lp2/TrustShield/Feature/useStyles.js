import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    paddingTop: 25,

    [breakpoints.down('sm')]: {
      paddingTop: 15,
    },
  },
  title: {
    fontSize: '32px',
    lineHeight: '43px',
    fontWeight: '400',
    margin: '0',
    color: '#000',
    textTransform: 'capitalize',

    [breakpoints.down('md')]: {
      fontSize: '24px',
      lineHeight: '32px',
    },
  },
  text: {
    fontSize: '16px',
    lineHeight: '25px',
    fontWeight: '400',
    color: '#666',

    [breakpoints.down('md')]: {
      lineHeight: '21px',
      marginTop: '10px',
    },
  },
}));
