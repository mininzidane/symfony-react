import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    ...mixins.textEllipsis(),
    ...mixins.font(14, 20, 400),
    display: 'flex',
    justifyContent: 'space-between',
    padding: [[3, 0, 4]],
    borderBottom: '1px solid #E3E3E3',
    color: '#226900',
  },
  label: {
    paddingRight: 10,
    flexShrink: 0,
    maxWidth: '50%',
    whiteSpace: 'initial',
    color: '#226900',
  },
  value: {
    ...mixins.font(18, 20, 400),
    fontWeight: 700,
    whiteSpace: 'initial',
    textAlign: 'right',
    wordBreak: 'break-all',
    color: '#226900',
  },
}));
