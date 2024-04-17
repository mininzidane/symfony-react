import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: 24,

    [breakpoints.down('sm')]: {
      gridGap: 20,
    },
  },
  section: {
    padding: '20px 15px',
    boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0px 6px',
    borderRadius: 4,
  },
  currency: {
    fontWeight: 400,
  },
}));
