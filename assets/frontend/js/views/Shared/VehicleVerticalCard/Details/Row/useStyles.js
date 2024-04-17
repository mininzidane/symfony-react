import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    ...mixins.textEllipsis(),
    ...mixins.font(14, 20, 400),
    display: 'grid',
    gridTemplateColumns: 'fit-content(100%) fit-content(100%)',
    justifyContent: 'space-between',
    padding: [[3, 0, 4]],
    borderBottom: '1px solid #E3E3E3',
  },
  label: {
    paddingRight: 5,
    flexShrink: 0,
    color: '#000000',
    whiteSpace: 'initial',
    wordBreak: 'break-word',
  },
  value: {
    fontWeight: 700,
    paddingLeft: 5,
    color: '#333333',
    whiteSpace: 'initial',
    textAlign: 'right',
    wordBreak: 'break-word',
  },
}));
