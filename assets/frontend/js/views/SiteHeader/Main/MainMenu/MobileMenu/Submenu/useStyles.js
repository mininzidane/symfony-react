import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    borderTop: '1px solid #303133',
  },
  trigger: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: [[12, 14]],
    fontSize: 16,
    lineHeight: '20px',
    color: '#FFFFFF',
    fontWeight: 700,
    outline: 'none',

    '& > span': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  triggerIcon: {
    '&.is-open': {
      transform: 'scaleY(-1)',
    },
  },
  rightTriangleIcon: {
    transform: 'rotate(-90deg) translateX(-1px)',
    marginLeft: '13px',
    flexShrink: 0,
    '& path': {
      fill: '#FFF',
    },
  },
  submenu: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  submenuListItem: {
    listStyle: 'none',
    display: 'block',
    '&:last-child $submenuLink': {
      borderBottom: 'none',
    },
  },
  submenuLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#E8E8E8 !important',
    fontSize: 16,
    lineHeight: '20px',
    padding: [[12, 14]],
    textDecoration: 'none',
    backgroundColor: '#0F0F0F',
    borderBottom: '1px solid #303133',
  },
}));
