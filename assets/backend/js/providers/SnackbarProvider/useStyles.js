import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins, isRtl }) => ({
  root: {
    width: 380,
    minHeight: 60,
    padding: [[3, 15]],
    lineHeight: '19px',
    fontSize: 16,
    flexWrap: 'nowrap',
    boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.2)',
    display: 'flex',
    justifyContent: 'space-between',
    [breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  action: {
    border: '1px solid rgba(255,255,255, 0.4)',
    borderRadius: 4,
    minWidth: 96,
    height: 30,
    padding: '0px 10px',
    marginLeft: isRtl ? 0 : 14,
    marginRight: isRtl ? 14 : 0,
    textTransform: 'uppercase',
    display: 'flex',
    justifyContent: 'center',
    fontSize: 14,
    flexShrink: 0,
    cursor: 'pointer',
    '& > a': {
      minWidth: 96,
      whiteSpace: 'nowrap',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: -10,
      marginRight: -10,
      padding: '0 10px',
      textDecoration: 'none',
      color: '#fff',
      lineHeight: '30px',
    },
  },
  success: {
    ...mixins.font(16, 16, 700),
  },
  container: {
    zIndex: 9999999,
    width: '100%',
    [breakpoints.down('xs')]: {
      maxWidth: 'calc(100% - 26px)',
    },
  },
  message: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridGap: '1px 14px',
    ...mixins.font(14, 16, 400),
  },
  label: {
    ...mixins.font(16, 16, 700),
  },
  icon: {
    gridRow: '1/4',
  },
}));
