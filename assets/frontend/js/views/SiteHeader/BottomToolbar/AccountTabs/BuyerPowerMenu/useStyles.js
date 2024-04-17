import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    position: 'fixed',
    display: 'flex',
    maxHeight: 'calc(100vh - 88px)',
    zIndex: 50001,
    boxShadow: 'rgb(9 30 66 / 25%) 0px 4px 8px -2px, rgb(9 30 66 / 31%) 0px 0px 1px',
    top: 'auto',
    right: 5,
    bottom: 61, // 56 + 5
    width: 'calc(100% - 10px)',
    minWidth: 240,
  },
  accountMenu: {
    padding: [[18, 0]],
    backgroundColor: '#ffffff',
    borderRadius: 10,
    transform: 'translateY(-15px)',
    transition: 'transform 225ms ease-out',
    overflow: 'auto',
    display: 'flex',
    height: 'auto',
    width: '100%',
    flexWrap: 'wrap',

    '&.is-open': {
      transform: 'translateY(0)',
    },
  },
  link: {
    padding: [[0, 18]],
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    lineHeight: '40px',
    fontSize: 16,
    width: '100%',
    color: '#000',
    textDecoration: 'none !important',

    '&:hover': {
      backgroundColor: '#F0F0F6',
    },
  },

  due: {
    color: '#B32417',
  },
}));
