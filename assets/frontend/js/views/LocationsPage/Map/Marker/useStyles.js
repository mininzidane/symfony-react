import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    padding: 5,
  },
  link: {
    fontSize: 14,
    fontWeight: 700,

    '&.is-uppercase': {
      textTransform: 'uppercase',
    },
  },
  line: {
    display: 'flex',
    alignItems: 'flex-start',

    '&:not(:first-child)': {
      marginTop: 10,
    },
  },
  icon: {
    width: 14,
    height: 12,
    marginRight: 10,
    marginTop: 1,
  },
}));
