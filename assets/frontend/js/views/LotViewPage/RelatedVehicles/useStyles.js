import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  tab: {
    fontSize: 18,
    marginRight: 20,
    padding: [[6, 0]],

    [breakpoints.down('sm')]: {
      fontSize: 14,
    },
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
  },
}));
