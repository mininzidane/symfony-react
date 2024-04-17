import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    height: 48,

    [breakpoints.down('sm')]: {
      height: 20,
    },
  },
  bar: {
    height: 2,
    backgroundColor: '#C4C4C4',
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
    backgroundColor: '#2158F5',
    top: 23,
    left: 0,
    position: 'absolute',

    [breakpoints.down('sm')]: {
      top: 9,
    },
  },
  allCompletedBar: {
    backgroundColor: '#4A9029',
    height: 2,
    width: '100%',
    top: 23,
    left: 0,
    position: 'absolute',

    [breakpoints.down('sm')]: {
      top: 9,
    },
  },
}));
