import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    height: 48,
    marginBottom: '36px',
    width: '100%',
    [breakpoints.down('sm')]: {
      height: 20,
    },
  },
  bar: {
    height: 2,
    backgroundColor: '#E0E0E0',
    width: '100%',
    top: 23,
    left: 0,
    position: 'absolute',

    [breakpoints.down('sm')]: {
      top: 9,
    },
  },
  completedBar: {
    height: 2,
    backgroundColor: '#4A9029',
    top: 23,
    left: 0,
    position: 'absolute',

    [breakpoints.down('sm')]: {
      top: 9,
    },
  },
}));
