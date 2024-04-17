import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 102,
    position: 'relative',
    top: 1,
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    '& img': {
      height: 18,
      width: 18,
      marginRight: 8,
    },

    '& span': {
      fontSize: 12,
      lineHeight: '12px',
    },
  },
}));
