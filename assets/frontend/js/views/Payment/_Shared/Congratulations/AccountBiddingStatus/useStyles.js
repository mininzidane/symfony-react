import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {},
  title: {
    marginBottom: 15,
    fontSize: 18,
    width: '100%',
    lineHeight: '24px',
    color: '#4F4F4F',
    textAlign: 'center',

    [breakpoints.down('sm')]: {
      fontSize: 16,
    },
  },
}));
