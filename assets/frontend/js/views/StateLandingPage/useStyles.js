import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  form: {
    background: 'white',
    display: 'none',

    [breakpoints.down('md')]: {
      borderBottom: '1px solid #e0e0e0',
      display: 'block',
    },
  },
}));
