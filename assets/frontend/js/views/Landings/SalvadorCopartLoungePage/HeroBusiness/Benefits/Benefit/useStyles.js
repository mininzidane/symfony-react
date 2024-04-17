import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins, breakpoints }) => ({
  root: {
    ...mixins.font(18, 28, 700),
    color: '#fff',
    paddingLeft: 30,
    position: 'relative',
    [breakpoints.down('sm')]: {
      paddingLeft: 25,
      fontSize: 14,
      lineHeight: '22px',
    },
  },
  checkmarkIcon: {
    position: 'absolute',
    top: 6,
    left: 0,
    width: 18,
    height: 18,
    [breakpoints.down('sm')]: {
      top: 4,
      width: 14,
      height: 14,
    },
  },
}));
