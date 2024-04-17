import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  image: {
    display: 'block',
    minWidth: 400,
    maxHeight: 'calc(100vh - 110px)',

    [breakpoints.down('sm')]: {
      minWidth: 0,
    },
  },
}));
