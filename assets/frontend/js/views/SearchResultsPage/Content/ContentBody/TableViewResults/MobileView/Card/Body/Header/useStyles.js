import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    paddingBottom: 3,

    [breakpoints.down('sm')]: {
      alignItems: 'center',
    },
  },
  watchlist: {
    position: 'relative',
    alignSelf: 'start',
    marginLeft: 10,
    minWidth: 30,

    '& button': {
      position: 'absolute',
      top: 0,
      right: 0,
      transform: 'scale(0.8666)',
    },
  },
}));
