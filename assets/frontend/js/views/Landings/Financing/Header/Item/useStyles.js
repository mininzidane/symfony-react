import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints, mixins }) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '33%',

    [breakpoints.down('sm')]: {
      flexDirection: 'row',
      marginBottom: 24,
      width: 'auto',
    },
  },
  img: {
    marginBottom: 13,
    height: 48,
    width: 48,

    [breakpoints.down('sm')]: {
      marginBottom: 0,
    },
  },
  text: {
    ...mixins.font(14, 18, 400),

    [breakpoints.down('sm')]: {
      marginLeft: 17,
    },
  },
}));
