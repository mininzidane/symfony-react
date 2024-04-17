import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  stepTitle: {
    display: 'block',
    marginBottom: 10,
  },
  step: {
    padding: 25,
    backgroundColor: '#FFF',

    '&:not(:first-child)': {
      marginTop: 3,
    },
  },
}));
