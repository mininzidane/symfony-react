import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    paddingTop: 2,

    [breakpoints.down('xs')]: {
      marginTop: 10,
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%',
    },
  },
}));
