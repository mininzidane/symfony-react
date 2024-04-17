import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ isRtl }) => ({
  root: {
    marginBottom: 4,
  },
  navigation: {
    position: 'absolute',
    top: 'calc(50% - 25px)',
    width: 50,
    height: 50,
    transform: `scaleX(${isRtl ? -1 : 1})`,

    '& > img': {
      width: 12,
      height: 20,
    },
  },
  prev: {
    left: 20,

    '& > img': {
      marginRight: 3,
    },
  },
  next: {
    transform: `rotate(${isRtl ? 0 : 180}deg)`,
    right: 20,

    '& > img': {
      marginRight: 3,
    },
  },
}));
