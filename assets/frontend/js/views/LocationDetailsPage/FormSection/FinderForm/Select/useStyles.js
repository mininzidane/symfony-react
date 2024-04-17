import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: ({ isDropdownOpen }) => ({
    position: 'relative',
    width: '100%',
    zIndex: isDropdownOpen && 300,
    '& [class*=menu]': {
      opacity: isDropdownOpen ? 1 : 0,
      transition: 'all 0.2s ease-in-out',
    },
  }),
  label: {
    fontSize: 12,
    lineHeight: '16px',
    fontWeight: 400,
    color: '#BDBDBD',
    position: 'absolute',
    top: 6,
    left: 12,
    zIndex: 2,
    maxWidth: 'calc(100% - 42px)',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    pointerEvents: 'none',
  },
  nativeSelect: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    zIndex: 2,
  },
  nativeClearButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 32,
    height: '100%',
    opacity: 0,
    zIndex: 3,
  },
}));
