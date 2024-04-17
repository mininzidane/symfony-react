import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    display: 'flex',
    backgroundColor: '#FFF1C2',
    padding: [[16, 22]],
    width: '100%',

    [breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  icon: {
    marginRight: 15,
    flexShrink: 0,

    [breakpoints.down('sm')]: {
      float: 'left',
    },
  },
}));
