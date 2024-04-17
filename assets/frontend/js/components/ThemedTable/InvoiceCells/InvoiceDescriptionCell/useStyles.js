import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: 5,

    [breakpoints.down('sm')]: {
      gridGap: 0,
    },
  },
  link: {
    display: 'block',
  },
}));
