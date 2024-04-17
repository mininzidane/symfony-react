import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    ...mixins.font(14, 20),
    color: '#333',
    border: '1px solid #BDBDBD',
    width: '100%',
    height: 40,
    borderRadius: 4,
    paddingLeft: 10,

    '&:hover': {
      borderColor: '#757575',
    },
  },
}));
