import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '48px 1fr',
    gridGap: '15px 12px',
  },
  tooltipContainer: {
    padding: '20px !important',
  },
  icon: {
    marginTop: 2,
    display: 'block',
    width: '100%',
  },
}));
