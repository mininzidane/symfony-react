import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';

const StyledBadge = withStyles(() => ({
  badge: {
    color: '#FFFFFF',
    width: 'auto',
    height: '16px',
    padding: '0 3px',
    fontSize: '11px',
    minWidth: '16px',
    minHeight: '16px',
    fontWeight: 'normal',
    borderRadius: '8px',
    backgroundColor: '#C40000',
  },
  anchorOriginTopRightRectangle: {
    top: -5,
    right: 5,
    transform: 'translateX(100%) scale(1)',
    transformOrigin: '50%',
  },
  invisible: {
    '$anchorOriginTopRightRectangle&': {
      transform: 'translateX(100%) scale(0)',
    },
  },
}))(Badge);

export default StyledBadge;
