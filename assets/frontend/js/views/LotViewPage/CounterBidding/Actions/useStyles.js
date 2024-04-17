import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(({ breakpoints }) => ({
  root: {
    backgroundColor: '#E6ECFD',
    borderRadius: 6,
    padding: '8px',
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: -8,
  },
  btnWrap: {
    width: 'auto',
    minWidth: '50%',
    flexShrink: '0',
    flexGrow: '1',
    padding: 6,
    [breakpoints.down('xs')]: {
      minWidth: '100%',
    },
  },
}));
