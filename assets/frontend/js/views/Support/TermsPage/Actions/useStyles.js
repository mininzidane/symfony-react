import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    [breakpoints.down('sm')]: {
      marginTop: 40,
    },
  },
  btn: {
    minWidth: 200,
    margin: '30px 15px',
    [breakpoints.down('sm')]: {
      margin: '0 0 15px',
      width: '100%!important',
    },
  },
}));
