import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    fontSize: 16,
    lineHeight: '22px',
    paddingLeft: 22,
    position: 'relative',
    marginBottom: 26,

    [breakpoints.down('sm')]: {
      marginBottom: 10,
      fontSize: 14,
      lineHeight: '20px',
    },
  },
  checkmarkIcon: {
    position: 'absolute',
    top: 6,
    left: 0,
    width: 12,
    height: 12,

    [breakpoints.down('sm')]: {
      top: 5,
    },
  },
}));
