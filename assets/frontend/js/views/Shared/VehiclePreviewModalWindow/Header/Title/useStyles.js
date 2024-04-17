import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    ...mixins.textEllipsis(),
    fontSize: 20,
    lineHeight: '28px',
    fontWeight: 700,
    color: '#000',
  },
}));
