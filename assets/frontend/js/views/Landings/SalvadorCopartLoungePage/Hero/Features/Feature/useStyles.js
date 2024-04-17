import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '42px 1fr',
    gridGap: 20,
  },
  text: {
    color: '#fff',
  },
  icon: {
    marginTop: 4,
  },
}));
