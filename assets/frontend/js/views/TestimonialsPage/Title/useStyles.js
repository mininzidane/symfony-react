import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    textAlign: 'center',
    color: '#333333',
    marginTop: '36px',
    marginBottom: '28px',
    ...mixins.font(32, 42, 350),
    [breakpoints.down('sm')]: {
      margin: '20px auto 19px',
      width: '90%',
      ...mixins.font(24, 32),
    },
  },
}));
