import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 15,

    '& > *:not(:first-child)': {
      marginLeft: 20,
    },
  },
}));
