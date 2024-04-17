import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    ...mixins.font(14, 20, 600),
    color: '#333',
    borderTop: '1px solid #F1F1F8',
    width: '100%',
    padding: 8,
    display: 'block',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
}));
