import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    ...mixins.textEllipsis(),
    ...mixins.font(14, 20, 400),
    display: 'flex',
    justifyContent: 'space-between',
    padding: [[3, 0, 4]],
    borderBottom: '1px solid #E3E3E3',
  },
  label: {
    paddingRight: 10,
    flexShrink: 0,
    maxWidth: '50%',
    color: '#000000',
    whiteSpace: 'initial',
  },
  value: {
    fontWeight: 700,
    color: '#333333',
    whiteSpace: 'initial',
    textAlign: 'right',
    wordBreak: 'break-all',
  },
}));
