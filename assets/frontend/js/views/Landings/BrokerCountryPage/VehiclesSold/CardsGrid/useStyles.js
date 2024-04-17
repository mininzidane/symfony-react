import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    marginTop: 45,
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: 20,

    [breakpoints.down('md')]: {
      gridTemplateColumns: 'repeat(2, 1fr)',
    },
  },
}));
