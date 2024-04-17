import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  lotRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridGap: 15,
    textAlign: 'left',
    whiteSpace: 'nowrap',
  },
}));
