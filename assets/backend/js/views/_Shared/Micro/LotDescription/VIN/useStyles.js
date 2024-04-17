import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  vinRow: {
    lineHeight: '1',
    minHeight: '20px',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    display: 'flex',
    '&:empty': {
      minHeight: 'auto',
    },
  },
}));
