import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  '@global': {
    'body > div > style + iframe[title]:last-of-type': {
      display: 'none',
    },
    '#header-auth-buttons': {
      display: 'none',
    },
  },
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  loader: {
    minHeight: 300,
    position: 'relative',
  },
  footer: {
    marginTop: 'auto',
  },
}));
