import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridGap: '12px',
  },
  username: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '18px',
  },
}));
