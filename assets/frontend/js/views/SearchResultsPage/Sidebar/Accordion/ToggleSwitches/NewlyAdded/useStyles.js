import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 40px',
    gridGap: '8px',
    alignItems: 'center',
    color: '#333',
    paddingTop: '6px',
    paddingBottom: '6px',
  },
}));
