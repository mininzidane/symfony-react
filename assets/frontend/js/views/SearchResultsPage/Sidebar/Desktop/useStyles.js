import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    flex: '1 0 auto',
    width: 320,
    margin: [[0, 30, 0, -30]],
    padding: [[0, 30, 30, 30]],
    backgroundColor: '#fff',
    borderRight: '1px solid #E0E0E0',

    '@media(max-width: 1379px)': {
      marginRight: 20,
      width: 300,
    },
  },
  loading: {
    backgroundColor: 'unset',
    borderRight: 'none',
  },
  placeholder: {
    position: 'relative',

    '&::after': {
      content: '""',
      ...mixins.absolute(2, 0, 0, 0),
      zIndex: 99,
      background: '#F2F2F2',
      opacity: 0.9,
    },
  },
  ad: {
    marginLeft: -20,

    '@media(max-width: 1379px)': {
      marginLeft: -30,
    },
  },
}));
