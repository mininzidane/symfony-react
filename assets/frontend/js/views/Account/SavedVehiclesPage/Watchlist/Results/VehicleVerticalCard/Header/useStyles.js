import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 30px',
    gridGap: 14,
    alignItems: 'start',

    [breakpoints.down('sm')]: {
      alignItems: 'center',
    },
  },
}));
