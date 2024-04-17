import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    margin: '0 auto',
    maxWidth: '1143px',
    paddingBottom: '36px',
    [breakpoints.down('lg')]: {
      maxWidth: '974px',
    },
    [breakpoints.down('md')]: {
      maxWidth: '741px',
    },
  },
}));
