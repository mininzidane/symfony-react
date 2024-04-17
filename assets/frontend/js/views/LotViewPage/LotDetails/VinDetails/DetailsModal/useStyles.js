import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    padding: [[24, 15, 40, 46]],
    borderRadius: 4,
    backgroundColor: '#FFF',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',

    [breakpoints.down('sm')]: {
      height: '100vh',
      width: '100% !important',
      padding: [[24, 10, 30, 25]],
      borderRadius: 0,
    },
  },
}));
