import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#F1F1F8',
    display: 'flex',
    height: 105,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  btn: {
    width: 224,

    [breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));
