import { makeStyles } from '@material-ui/core/styles';
import CheckmarkBlueSVG from './img/checkmark-blue.svg';

export default makeStyles(() => ({
  root: {
    position: 'relative',
    paddingLeft: '24px',
    fontSize: '18px',
    lineHeight: '26px',
    marginBottom: '16px',
    "[dir='rtl'] &": {
      paddingLeft: '0',
      paddingRight: '24px',
    },
    '&:before': {
      content: '""',
      backgroundImage: `url(${CheckmarkBlueSVG})`,
      position: 'absolute',
      left: '0',
      width: '16px',
      height: '28px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      "[dir='rtl'] &": {
        left: 'auto',
        right: 0,
      },
    },
    '&:last-child': {
      marginBottom: '0',
    },
  },
}));
