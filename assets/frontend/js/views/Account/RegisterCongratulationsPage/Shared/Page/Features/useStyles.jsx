import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    width: 'calc(50% - 10px)',

    [breakpoints.down('md')]: {
      width: '100%',
    },
  },
}));
