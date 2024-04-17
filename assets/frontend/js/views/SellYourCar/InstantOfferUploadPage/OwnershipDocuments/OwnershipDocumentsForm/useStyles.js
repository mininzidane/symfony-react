import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '12px',
    marginBottom: '14px',
    maxWidth: 508,
    marginLeft: 'auto',
    marginRight: 'auto',
    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  label: {
    marginBottom: 7,
  },
}));
