import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  cta: {
    userSelect: 'text',
  },
  spinner: {
    textAlign: 'center',
    marginTop: 2,
  },
  wrap: {
    display: 'inline-grid',
    gridTemplateColumns: '1fr 14px',
    alignItems: 'start',
    gridGap: 8,
  },
}));
