import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    marginTop: 24,

    '& > a': {
      marginRight: 10,
      opacity: 0.6,
      minWidth: 24,

      '&:last-child': {
        marginRight: 0,
      },

      '&:hover': {
        opacity: 1,
      },
    },
  },
}));
