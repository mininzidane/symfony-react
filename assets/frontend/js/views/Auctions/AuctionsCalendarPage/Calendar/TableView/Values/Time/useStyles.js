import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '6px',
  },
  dot: {
    width: '5px',
    height: '5px',
    marginTop: '7px',
    borderRadius: '5px',
    flexShrink: '0',
    backgroundColor: 'rgba(130,130,130, 0.5)',
  },
}));
