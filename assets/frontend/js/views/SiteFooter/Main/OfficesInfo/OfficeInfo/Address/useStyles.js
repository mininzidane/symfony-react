import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '22px 1fr',
    gridGap: 10,
    color: '#333',
    fontSize: 16,
    lineHeight: '22px',
  },
}));
