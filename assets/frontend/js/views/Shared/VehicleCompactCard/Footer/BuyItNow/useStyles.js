import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    ...mixins.font(14, 20, 400),
    borderTop: '1px solid #F1F1F8',
    borderLeft: '1px solid #F1F1F8',
    width: '100%',
    padding: 8,
    display: 'block',
    textAlign: 'center',
    color: '#226900',
  },
}));
