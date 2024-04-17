import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    display: 'flex',
    width: '100%',
    padding: [[15, 0]],
    paddingBottom: 5,
    fontSize: '16px',
    lineHeight: '18px',
    color: '#000',
  },
  icon: {
    width: 18,
    height: 18,
    border: '2px solid #707070',
    borderRadius: 2,
    pointerEvents: 'none',
    marginRight: 12,
  },
}));
