import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    display: 'grid',
    gridGap: 5,
    gridTemplateColumns: '1fr 9px',
    cursor: 'pointer',

    '&::after': {
      content: "''",
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
  },
  label: ({ isNowrap }) => ({
    ...mixins.font(16, 20, 700),
    color: '#333',
    whiteSpace: isNowrap ? 'nowrap' : 'normal',
    textAlign: 'left',
    zIndex: 20,
    position: 'relative',
  }),
  icon: {
    marginTop: 5,
    zIndex: 20,
    position: 'relative',
  },
  upArrow: {
    fill: ({ isActive, order }) => (isActive && order === 'asc' ? '#999' : '#333'),
  },
  downArrow: {
    fill: ({ isActive, order }) => (isActive && order === 'desc' ? '#999' : '#333'),
  },
}));
