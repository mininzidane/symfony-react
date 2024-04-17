import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ mixins }) => ({
  root: {
    marginTop: 15,
    marginBottom: 20,
  },
  title: {
    ...mixins.font(14, 19),
    color: '#333333',
    textAlign: 'center',
    marginBottom: '6px',
  },
  cards: {
    display: 'flex',
    justifyContent: 'center',
    '& img': {
      height: '16px',
      margin: '0 3px',
    },
  },
}));
