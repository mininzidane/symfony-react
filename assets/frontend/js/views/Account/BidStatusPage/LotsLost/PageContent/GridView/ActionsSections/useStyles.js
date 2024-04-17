import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    width: '100%',
    marginTop: 'auto',
    padding: [[15, 20]],

    [breakpoints.down('sm')]: {
      padding: [[15, 14]],
    },
  },
}));
