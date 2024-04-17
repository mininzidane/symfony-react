import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  error: {
    ...mixins.font(12, 20, 600),
    color: '#B20000',
    marginTop: '5px',
    marginBottom: '-5px',
    textAlign: 'left',
  },
}));
