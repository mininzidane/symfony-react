import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gridGap: '20px',
    [breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  successMessage: {
    fontSize: 16,
    lineHeight: '21px',
    fontWeight: 400,
    textAlign: 'center',
  },
  phoneNumber: {
    color: '#000000',
  },
}));
