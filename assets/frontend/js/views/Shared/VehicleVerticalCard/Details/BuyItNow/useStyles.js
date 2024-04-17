import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    ...mixins.textEllipsis(),
    ...mixins.font(14, 20, 400),
    display: 'grid',
    gridTemplateColumns: 'fit-content(100%) fit-content(100%)',
    justifyContent: 'space-between',
    padding: [[3, 0, 4]],
    color: '#226900',
    borderBottom: '1px solid #E3E3E3',

    '&.is-abm-inventory': {
      borderBottom: 'none',
    },
  },
  label: {
    paddingRight: 5,
    flexShrink: 0,
    whiteSpace: 'initial',
    color: '#226900',
    wordBreak: 'break-all',
  },
  value: {
    ...mixins.font(18, 20, 700),
    paddingLeft: 5,
    whiteSpace: 'initial',
    textAlign: 'right',
    wordBreak: 'break-all',
    color: '#226900',
  },
}));
