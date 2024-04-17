import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '10px',
    alignItems: 'flex-start',

    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
}));
