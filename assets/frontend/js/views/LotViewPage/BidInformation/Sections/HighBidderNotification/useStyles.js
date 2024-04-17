import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    paddingBottom: 0,
    margin: [[15, 0, 0]],
  },
  messageContainer: {
    display: 'flex',
    alignItems: 'flex-start',
    textAlign: 'left',
  },
  smartphoneIcon: {
    marginRight: 15,
    width: 33,
    height: 33,

    [breakpoints.down('sm')]: {
      marginRight: 12,
    },
  },
}));
