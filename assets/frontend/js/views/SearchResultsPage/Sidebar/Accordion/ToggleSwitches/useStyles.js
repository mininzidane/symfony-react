import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    position: 'relative',
    paddingTop: '10px',
    paddingBottom: '10px',
  },
  switch: {
    display: 'grid',
    gridTemplateColumns: '1fr 40px',
    gridGap: '12px',
    alignItems: 'center',
    color: '#333',
    paddingTop: '6px',
    paddingBottom: '6px',
  },
}));
