import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 8,
  },
  button: {
    ...mixins.font(14, 20, 400),
    color: '#828282',
    borderBottom: '1px dashed #828282',

    '&:hover': {
      borderBottomColor: 'transparent',
    },
  },
}));
