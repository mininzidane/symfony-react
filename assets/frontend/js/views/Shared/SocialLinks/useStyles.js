import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'inline-flex',
    padding: [[0, 10]],

    '& > a:not(:last-child)': {
      marginRight: 5,
    },
  },
  link: {
    '&:hover': {
      opacity: 0.75,
    },

    '& img': {
      display: 'block',
      position: 'relative',
    },
  },
}));
