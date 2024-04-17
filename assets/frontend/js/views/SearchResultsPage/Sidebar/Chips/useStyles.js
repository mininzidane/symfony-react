import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',

    '&:empty': {
      display: 'none',
    },
  },
}));
