import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    width: 32,
    transform: ({ isDropdownOpen }) => (isDropdownOpen ? 'rotate(-180deg)' : 'none'),
  },
}));
